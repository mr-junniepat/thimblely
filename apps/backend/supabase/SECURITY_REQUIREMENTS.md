# Security Requirements for Thimberly

## Overview

This document outlines the security architecture, RLS policies, and CASL integration requirements for Thimberly's multi-tenant workspace platform.

---

## 1. Row Level Security (RLS) Policies

### **CRITICAL: Every tenant-scoped table MUST have RLS enabled**

RLS is the final gatekeeper and cannot be bypassed. Implement for all tables that are workspace-scoped:

- `clients` - WHERE workspace_id = current_workspace() AND deleted_at IS NULL
- `orders` - WHERE workspace_id = current_workspace() AND deleted_at IS NULL
- `messages` - WHERE workspace_id = current_workspace() AND deleted_at IS NULL
- `inventory_items` - WHERE workspace_id = current_workspace()
- `transactions` - WHERE workspace_id = current_workspace()
- `mcp_contexts` - WHERE workspace_id = current_workspace() AND is_active = true
- `file_uploads` - WHERE workspace_id = current_workspace()
- ALL workspace-scoped tables

### Sample RLS Policy

```sql
-- Example for orders table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only view orders in their workspaces"
  ON orders FOR SELECT
  USING (
    workspace_id IN (
      SELECT workspace_id
      FROM workspace_members
      WHERE user_id = auth.uid()
        AND invitation_status = 'active'
    )
    AND deleted_at IS NULL
  );

CREATE POLICY "Users can create orders in their workspaces"
  ON orders FOR INSERT
  WITH CHECK (
    workspace_id IN (
      SELECT workspace_id
      FROM workspace_members
      WHERE user_id = auth.uid()
        AND invitation_status = 'active'
        AND permissions @> '[{"action":"create","subject":"Order"}]'::jsonb
    )
  );
```

---

## 2. CASL Abilities & Permissions

### Canonical Role → Capabilities Mapping

Define canonical capabilities in `workspace_members.permissions`:

```typescript
// Example role definitions
const ROLE_CAPABILITIES = {
  owner: [
    'create:Order',
    'view:Order',
    'edit:Order',
    'delete:Order',
    'confirm:Order',
    'cancel:Order',
    'create:Client',
    'view:Client',
    'edit:Client',
    'create:Invoice',
    'issue:Invoice',
    'view:Finance',
    'export:Finance',
    // ... all capabilities
  ],
  admin: [
    'create:Order',
    'view:Order',
    'edit:Order',
    'confirm:Order',
    'create:Client',
    'view:Client',
    'edit:Client',
    // ... most capabilities
  ],
  manager: [
    'view:Order',
    'edit:Order',
    'view:Client',
    'edit:Client',
    // ... limited capabilities
  ],
  tailor: [
    'view:Order',
    'view:Client',
    'create:Measurement',
    // ... minimal capabilities
  ],
  viewer: [
    'view:Order',
    'view:Client',
    // ... read-only
  ],
};
```

### CASL Ability Factory

```typescript
import { defineAbility } from '@casl/ability';

export function createAbility(userPermissions: string[]) {
  return defineAbility((can) => {
    userPermissions.forEach((perm) => {
      const [action, subject] = perm.split(':');
      can(action, subject);
    });
  });
}
```

### Permission Version Synchronization

```typescript
// On permission change, increment version
await db.workspace_members.update({
  permissions: newPermissions,
  permissions_version: currentVersion + 1,
});

// Check version in JWT to invalidate on mismatch
if (jwt.permissions_version !== member.permissions_version) {
  throw new Error('Token invalid - refresh required');
}
```

---

## 3. Order Creation Safety

### Draft → Confirmed State Machine

```typescript
// orders.status must follow: draft → confirmed → paid → fulfilled

// NEVER auto-confirm without human oversight
// OR with strict confidence thresholds (e.g., >95%)

async function confirmOrder(orderId: string, confirmedBy: string) {
  await db.orders.update({
    where: { id: orderId },
    data: {
      status: 'confirmed',
      confirmed_by: confirmedBy, // MUST be profile UUID
      confirmed_at: new Date(),
    },
  });

  // Log audit event
  await db.system_events.create({
    data: {
      workspace_id: workspaceId,
      user_id: confirmedBy,
      event_name: 'order_confirmed',
      event_properties: { order_id: orderId },
    },
  });
}

// For AI-generated orders
if (order.created_from_context_id) {
  // Only auto-confirm if confidence >95% and record it
  if (confidenceScore > 0.95) {
    await confirmOrder(orderId, 'system_auto');
  } else {
    order.status = 'draft'; // requires manual confirmation
  }
}
```

---

## 4. Secret Management

### ❌ DO NOT store credentials in database

```typescript
// BAD
communication_channels.credentials = {
  apiKey: 'sk_live_...',
  webhook_secret: '...',
};
```

### ✅ Store credentials in Supabase Secrets Manager

```typescript
// Store only reference
communication_channels.credentials_ref = 'supabase_secret_ref_abc123';

// Retrieve at runtime
async function sendWhatsAppMessage(channelId: string, message: string) {
  const channel = await db.communication_channels.findUnique({
    where: { id: channelId },
  });

  // Get credentials from Secrets Manager
  const credentials = await supabase.secrets.retrieve(channel.credentials_ref);

  // Use credentials to send message
  await whatsappAPI.send({
    credentials,
    message,
  });
}
```

---

## 5. Webhook Idempotency

### Messages: UNIQUE(channel_id, platform_message_id)

```typescript
// On webhook received
async function handleIncomingMessage(webhookData: WebhookMessage) {
  try {
    await db.messages.create({
      data: {
        channel_id: webhookData.channel_id,
        platform_message_id: webhookData.message_id,
        // ... other fields
      },
    });
  } catch (error) {
    if (error.code === 'P2002') {
      // Unique constraint violation - duplicate message, skip
      console.log('Duplicate message, ignoring');
      return;
    }
    throw error;
  }
}
```

---

## 6. Vector Store Optimization

### ❌ DO NOT store large embeddings in PostgreSQL JSONB

```typescript
// BAD - bloats database
mcp_contexts.embeddings = [...1536 floats]; // ~6KB per context
```

### ✅ Use pgvector extension

```typescript
// 1. Enable pgvector extension
CREATE EXTENSION vector;

// 2. Create table with vector column
CREATE TABLE ai_embeddings (
  id uuid PRIMARY KEY,
  context_id uuid REFERENCES mcp_contexts(id),
  embedding vector(1536),
  metadata jsonb
);

// 3. Store only reference in mcp_contexts
mcp_contexts.vector_store_ref = 'embedding_table_id_xyz';

// 4. Query with similarity search
SELECT context_id
FROM ai_embeddings
WHERE embedding <-> query_embedding < 0.8
ORDER BY embedding <-> query_embedding
LIMIT 10;
```

---

## 7. Soft Deletes for GDPR

### Add deleted_at to sensitive tables

```typescript
// clients, orders, messages, etc.
{
  id: uuid,
  ...fields,
  deleted_at: timestamp | null,
  timestamps
}

// In RLS policies
WHERE deleted_at IS NULL

// Pseudo-anonymization for GDPR
async function eraseUserData(userId: string) {
  await db.clients.updateMany({
    where: { profile_id: userId },
    data: {
      name: '[REDACTED]',
      email: '[REDACTED]',
      phone: '[REDACTED]',
      deleted_at: new Date()
    }
  });

  // Log erasure
  await db.system_events.create({
    data: {
      event_name: 'user_data_erased',
      event_properties: { user_id: userId }
    }
  });
}
```

---

## 8. Performance Indexing

### Critical indexes for RLS queries

```sql
-- Workspace-scoped queries
CREATE INDEX idx_clients_workspace_status ON clients(workspace_id, status)
WHERE deleted_at IS NULL;

CREATE INDEX idx_orders_workspace_status ON orders(workspace_id, status)
WHERE deleted_at IS NULL;

CREATE INDEX idx_messages_workspace ON messages(workspace_id, channel_id, created_at);

-- mcp_contexts - active contexts only
CREATE INDEX idx_mcp_contexts_active ON mcp_contexts(workspace_id, is_active, expires_at)
WHERE is_active = true AND expires_at > NOW();
```

---

## 9. Concurrency & Transactions

### Order → Inventory → Payment Flow

```typescript
// Use database transactions for atomic operations
await db.$transaction(async (tx) => {
  // 1. Check inventory
  const item = await tx.inventory_items.findUnique({
    where: { id: itemId },
  });

  if (item.current_stock < quantity) {
    throw new Error('Insufficient stock');
  }

  // 2. Create order
  const order = await tx.orders.create({
    data: {
      status: 'draft',
      // ...
    },
  });

  // 3. Decrement inventory (with locking)
  await tx.$executeRaw`
    UPDATE inventory_items 
    SET current_stock = current_stock - ${quantity}
    WHERE id = ${itemId} 
      AND current_stock >= ${quantity}
  `;

  // 4. Update inventory movements
  await tx.inventory_movements.create({
    data: {
      inventory_item_id: itemId,
      movement_type: 'outbound',
      quantity,
      // ...
    },
  });

  return order;
});
```

---

## 10. Monitoring & Alerts

### Critical metrics to track

```typescript
// Track in system_events table
{
  event_name: 'suspicious_auto_order',
  event_category: 'security',
  event_properties: {
    order_id: string,
    confidence_score: number,
    channel: string
  }
}

// Alerts
- Webhook failure rate > 5%
- Auto-confirmed orders with confidence < 95%
- LLM cost spikes
- Low inventory thresholds
- Permission changes from non-owners
```

---

## Implementation Checklist

- [ ] Enable RLS on all workspace-scoped tables
- [ ] Define canonical role → capability mappings
- [ ] Implement CASL ability factory (client + server)
- [ ] Add permissions_version to workspace_members
- [ ] Implement order draft → confirmed workflow with confirmed_by
- [ ] Store credentials in Supabase Secrets, not DB
- [ ] Add UNIQUE constraint on messages(channel_id, platform_message_id)
- [ ] Use pgvector for mcp_contexts.embeddings
- [ ] Add deleted_at to sensitive tables
- [ ] Create indexes on common RLS filter columns
- [ ] Implement audit logging in system_events
- [ ] Add webhook idempotency handling
- [ ] Implement soft delete UI/recovery workflows
- [ ] Set up monitoring alerts
- [ ] Document role-based access control (RBAC) flows
