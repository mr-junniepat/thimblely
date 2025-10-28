import { gql } from '@apollo/client';

/**
 * Mutation to sign up a new user
 */
export const SIGN_UP_MUTATION = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      user {
        id
        email
        role
        country_code
        is_verified
        is_active
        owns_workspace
      }
      profile {
        id
        email
        role
        country_code
        is_verified
        is_active
        owns_workspace
        metadata
      }
      workspace {
        id
        owner_id
        name
        slug
        business_type
        is_locked
        settings
      }
      workspace_member {
        id
        workspace_id
        user_id
        role
        permissions
        permissions_version
        invitation_status
      }
      token
      refresh_token
    }
  }
`;

/**
 * Mutation to sign in an existing user
 */
export const SIGN_IN_MUTATION = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      user {
        id
        email
        role
        country_code
        is_verified
        is_active
        owns_workspace
      }
      profile {
        id
        email
        role
        country_code
        is_verified
        is_active
        owns_workspace
        metadata
      }
      workspace {
        id
        owner_id
        name
        slug
        business_type
        is_locked
        settings
      }
      workspace_member {
        id
        workspace_id
        user_id
        role
        permissions
        permissions_version
        invitation_status
      }
      token
      refresh_token
    }
  }
`;

/**
 * Mutation to sign out current user
 */
export const SIGN_OUT_MUTATION = gql`
  mutation SignOut {
    signOut
  }
`;

/**
 * Mutation to verify email with code
 */
export const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input)
  }
`;

/**
 * Mutation to resend verification code
 */
export const RESEND_VERIFICATION_MUTATION = gql`
  mutation ResendVerification($input: ResendVerificationInput!) {
    resendVerification(input: $input)
  }
`;

/**
 * Mutation to sign in with Google
 */
export const SIGN_IN_WITH_GOOGLE_MUTATION = gql`
  mutation SignInWithGoogle($input: SocialAuthInput!) {
    signInWithGoogle(input: $input) {
      user {
        id
        email
        role
        country_code
        is_verified
        is_active
        owns_workspace
      }
      profile {
        id
        email
        role
        country_code
        is_verified
        is_active
        owns_workspace
        metadata
      }
      workspace {
        id
        owner_id
        name
        slug
        business_type
        is_locked
        settings
      }
      workspace_member {
        id
        workspace_id
        user_id
        role
        permissions
        permissions_version
        invitation_status
      }
      token
      refresh_token
    }
  }
`;

/**
 * Mutation to sign in with Apple
 */
export const SIGN_IN_WITH_APPLE_MUTATION = gql`
  mutation SignInWithApple($input: SocialAuthInput!) {
    signInWithApple(input: $input) {
      user {
        id
        email
        role
        country_code
        is_verified
        is_active
        owns_workspace
      }
      profile {
        id
        email
        role
        country_code
        is_verified
        is_active
        owns_workspace
        metadata
      }
      workspace {
        id
        owner_id
        name
        slug
        business_type
        is_locked
        settings
      }
      workspace_member {
        id
        workspace_id
        user_id
        role
        permissions
        permissions_version
        invitation_status
      }
      token
      refresh_token
    }
  }
`;

/**
 * Mutation to request password reset
 */
export const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`;

/**
 * Mutation to reset password with token
 */
export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password)
  }
`;

/**
 * Mutation to change password
 */
export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

/**
 * Mutation to create a workspace
 */
export const CREATE_WORKSPACE_MUTATION = gql`
  mutation CreateWorkspace($input: CreateWorkspaceInput!) {
    createWorkspace(input: $input) {
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
 * Mutation to invite user to workspace
 */
export const INVITE_TO_WORKSPACE_MUTATION = gql`
  mutation InviteToWorkspace(
    $workspace_id: ID!
    $email: String!
    $role: String!
  ) {
    inviteToWorkspace(workspace_id: $workspace_id, email: $email, role: $role) {
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
 * Mutation to accept workspace invitation
 */
export const ACCEPT_WORKSPACE_INVITATION_MUTATION = gql`
  mutation AcceptWorkspaceInvitation($invitation_id: ID!) {
    acceptWorkspaceInvitation(invitation_id: $invitation_id) {
      id
      workspace_id
      user_id
      role
      permissions
      permissions_version
      invitation_status
      invited_by
      created_at
      updated_at
    }
  }
`;

/**
 * Mutation to remove workspace member
 */
export const REMOVE_WORKSPACE_MEMBER_MUTATION = gql`
  mutation RemoveWorkspaceMember($workspace_id: ID!, $user_id: ID!) {
    removeWorkspaceMember(workspace_id: $workspace_id, user_id: $user_id)
  }
`;

/**
 * Mutation to update user profile
 */
export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
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
 * Mutation to update profile settings
 */
export const UPDATE_PROFILE_SETTINGS_MUTATION = gql`
  mutation UpdateProfileSettings($input: UpdateProfileSettingsInput!) {
    updateProfileSettings(input: $input) {
      id
      user_id
      privacy_settings
      notification_preferences
      created_at
      updated_at
    }
  }
`;
