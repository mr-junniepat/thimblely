# ⚠️ CRITICAL: Database Reset Protection

## Rule: NEVER reset the database without explicit user authorization

### What triggers this rule:

- `npx supabase db reset`
- `npx supabase db reset --linked`
- Any command that **reverses** or **deletes** database state

### Authorization Required:

Always ask the user before:

- Resetting the database
- Dropping tables/schemas
- Reverting migrations
- Any destructive database operation

### When migration fixes are needed:

1. ✅ Create a NEW migration file with the fix
2. ✅ Let the user apply it when they're ready
3. ❌ NEVER reset the entire database
4. ❌ NEVER drop and recreate tables

### Example of CORRECT approach:

```bash
# Create a fix migration
npx supabase migration new fix_profiles_rls_recursion

# Let user review and apply
# DON'T force-push or reset
```

### Example of INCORRECT approach:

```bash
# ❌ NEVER DO THIS without user approval
npx supabase db reset --linked
```

### User Authorization Format:

Ask: "Would you like me to reset the database? ⚠️ This will DELETE all data."

Only proceed if user explicitly says "yes" or "I authorize".

---

**🚨 This rule protects against accidental data loss!**
