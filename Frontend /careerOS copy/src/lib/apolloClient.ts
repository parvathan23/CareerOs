// src/lib/apolloClient.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// 1. GraphQL endpoint
const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql/', // Update if deployed
    credentials: 'include', // Optional: include cookies if needed
});

// 2. Attach JWT token from localStorage
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            Authorization: token ? `JWT ${token}` : '', // Use capital 'Authorization'
        },
    };
});

// 3. Handle expired token (e.g., "Signature has expired")
const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
        for (const err of graphQLErrors) {
            if (err.message.includes('Signature has expired')) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }
    }
});


// 4. Create Apollo client
export const client = new ApolloClient({
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache(),
});