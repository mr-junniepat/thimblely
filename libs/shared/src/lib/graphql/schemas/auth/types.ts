// Authentication types for GraphQL
export interface Profile {
  id: string;
  email: string;
  role: string;
  country_code?: string | null;
  is_verified: boolean;
  is_active: boolean;
  owns_workspace: boolean;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
  country_code?: string | null;
  is_verified: boolean;
  is_active: boolean;
  owns_workspace: boolean;
  created_at: string;
  updated_at: string;
}

export interface Workspace {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  business_type?: string | null;
  is_locked: boolean;
  settings?: any;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceMember {
  id: string;
  workspace_id: string;
  user_id: string;
  role: string;
  permissions: any;
  permissions_version: number;
  invitation_status: string;
  invited_by?: string | null;
  removed_at?: string | null;
  removed_by?: string | null;
  removal_reason?: any;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceInvitation {
  id: string;
  workspace_id: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}
