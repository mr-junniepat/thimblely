'use client';

import { ApolloProvider } from '@apollo/client/react';
import { createApolloClient } from '@thimblely/shared';
import { ReactNode } from 'react';

const client = createApolloClient();

export function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

