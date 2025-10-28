import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { setContext } from '@apollo/client/link/context';
import { createClient } from '@supabase/supabase-js';

/**
 * Supabase configuration
 */
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  '';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * GraphQL endpoint
 * Supabase provides a GraphQL endpoint at: https://your-project.supabase.co/graphql/v1
 */
const GRAPHQL_URL = `${supabaseUrl.replace('/rest/v1', '')}/graphql/v1`;
const API_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ||
  process.env.EXPO_PUBLIC_GRAPHQL_URL ||
  GRAPHQL_URL;

/**
 * Create Apollo Client with Supabase authentication
 */
export const createApolloClient = () => {
  // Authentication link to add auth headers
  const authLink = setContext(async (_, { headers }) => {
    // Get the session from Supabase
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Return the headers with the auth token
    return {
      headers: {
        ...headers,
        authorization: session?.access_token
          ? `Bearer ${session.access_token}`
          : '',
        apikey: supabaseAnonKey,
      },
    };
  });

  const httpLink = new HttpLink({
    uri: API_URL,
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        fetchPolicy: 'network-only',
      },
      mutate: {
        fetchPolicy: 'no-cache',
      },
    },
  });
};

// Export a default client instance
export const client = createApolloClient();
