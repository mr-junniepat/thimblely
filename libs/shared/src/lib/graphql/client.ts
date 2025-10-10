import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql';

export const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: API_URL,
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
};

