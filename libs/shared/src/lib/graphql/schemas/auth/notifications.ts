import { gql } from '@apollo/client';

/**
 * Query to get user notifications
 */
export const GET_NOTIFICATIONS_QUERY = gql`
  query GetNotifications($userId: UUID!) {
    notificationsCollection(
      filter: { user_id: { eq: $userId } }
      orderBy: { created_at: DescNullsLast }
    ) {
      edges {
        node {
          id
          notification_type
          data
          is_read
          created_at
        }
      }
    }
  }
`;

/**
 * Mutation to mark notification as read
 */
export const MARK_NOTIFICATION_READ_MUTATION = gql`
  mutation MarkNotificationRead($id: UUID!) {
    updateNotificationsCollection(
      filter: { id: { eq: $id } }
      set: { is_read: true }
    ) {
      records {
        id
        is_read
      }
    }
  }
`;
