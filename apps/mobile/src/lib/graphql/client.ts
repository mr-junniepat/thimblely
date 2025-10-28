import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { setContext } from '@apollo/client/link/context';
import { supabase } from '../../lib/supabase';

/**
 * GraphQL endpoint configuration
 */
const getGraphQLUrl = () => {
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
  // Check if URL ends with /rest/v1 and replace with /graphql/v1
  if (supabaseUrl.includes('/rest/v1')) {
    return `${supabaseUrl.replace('/rest/v1', '')}/graphql/v1`;
  }
  // Otherwise append /graphql/v1 to the base URL
  return `${supabaseUrl}/graphql/v1`;
};

/**
 * Create Apollo Client with Supabase authentication
 */
export const createApolloClient = () => {
  // Authentication link to add auth headers
  const authLink = setContext(async (_, { headers }) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return {
      headers: {
        ...headers,
        authorization: session?.access_token
          ? `Bearer ${session.access_token}`
          : '',
        apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
      },
    };
  });

  const httpLink = new HttpLink({
    uri: getGraphQLUrl(),
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
};

export const client = createApolloClient();
