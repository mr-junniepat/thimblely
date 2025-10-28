export * from './client';
export * from './queries';
export * from './mutations';
export * from './schemas';

// Explicitly export client instance
export { client, createApolloClient, supabase } from './client';
