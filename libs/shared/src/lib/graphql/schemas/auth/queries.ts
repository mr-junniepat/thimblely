import { gql } from '@apollo/client';

/**
 * Query to get current user profile
 */
export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      phone
      full_name
      avatar_url
      role
      business_type
      country_code
      region
      data_residency_region
      is_verified
      is_active
      owns_workspace
      verification_token
      verification_sent_at
      verified_at
      onboarding_completed
      metadata
      created_at
      updated_at
    }
  }
`;

/**
 * Query to get all workspaces for current user
 */
export const MY_WORKSPACES_QUERY = gql`
  query MyWorkspaces {
    myWorkspaces {
      id
      owner_id
      name
      slug
      business_type
      is_locked
      settings
      created_at
      updated_at
    }
  }
`;

/**
 * Query to get current active workspace
 */
export const CURRENT_WORKSPACE_QUERY = gql`
  query CurrentWorkspace {
    currentWorkspace {
      id
      owner_id
      name
      slug
      business_type
      is_locked
      settings
      created_at
      updated_at
    }
  }
`;

/**
 * Query to get a specific user
 */
export const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      email
      role
      country_code
      is_verified
      is_active
      owns_workspace
      created_at
      updated_at
    }
  }
`;

/**
 * Query to get a specific profile
 */
export const PROFILE_QUERY = gql`
  query Profile($id: ID!) {
    profile(id: $id) {
      id
      email
      role
      country_code
      is_verified
      is_active
      owns_workspace
      metadata
      created_at
      updated_at
    }
  }
`;

/**
 * Query to get a specific workspace
 */
export const WORKSPACE_QUERY = gql`
  query Workspace($id: ID!) {
    workspace(id: $id) {
      id
      owner_id
      name
      slug
      business_type
      is_locked
      settings
      created_at
      updated_at
    }
  }
`;

/**
 * Query to get workspace by slug
 */
export const WORKSPACE_BY_SLUG_QUERY = gql`
  query WorkspaceBySlug($slug: String!) {
    workspaceBySlug(slug: $slug) {
      id
      owner_id
      name
      slug
      business_type
      is_locked
      settings
      created_at
      updated_at
    }
  }
`;

/**
 * Query to get workspace members
 */
export const WORKSPACE_MEMBERS_QUERY = gql`
  query WorkspaceMembers($workspace_id: ID!) {
    workspaceMembers(workspace_id: $workspace_id) {
      id
      workspace_id
      user_id
      role
      permissions
      permissions_version
      invitation_status
      invited_by
      removed_at
      removed_by
      removal_reason
      created_at
      updated_at
    }
  }
`;

/**
 * Query to get workspace invitations
 */
export const WORKSPACE_INVITATIONS_QUERY = gql`
  query WorkspaceInvitations($workspace_id: ID!) {
    workspaceInvitations(workspace_id: $workspace_id) {
      id
      workspace_id
      email
      role
      created_at
      updated_at
    }
  }
`;

/**
 * Query to check if user is authenticated
 */
export const IS_AUTHENTICATED_QUERY = gql`
  query IsAuthenticated {
    isAuthenticated
  }
`;

/**
 * Query to get current session
 */
export const SESSION_QUERY = gql`
  query Session {
    session {
      access_token
      token_type
      expires_in
      refresh_token
      user {
        id
        email
        role
        country_code
        is_verified
        is_active
        owns_workspace
        created_at
        updated_at
      }
    }
  }
`;

/**
 * Query to get user's posts from feeds collection
 */
export const GET_USER_POSTS_QUERY = gql`
  query GetUserPosts($userId: UUID!) {
    feedsCollection(
      filter: { user_id: { eq: $userId } }
      orderBy: { created_at: DescNullsLast }
      first: 6
    ) {
      edges {
        node {
          id
          media_urls
          caption
          created_at
        }
      }
    }
  }
`;
