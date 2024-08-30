import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import {jwtDecode} from 'jwt-decode';

// Get token from localStorage or other secure place
const getToken = () => localStorage.getItem('token');

// Create an auth link to add the token to the headers
const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authentication token from localStorage if it exists
  const token = getToken();

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      Authorization: token ? `JWT ${token}` : "",
    }
  });

  return forward(operation);
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(new HttpLink({ uri: 'http://localhost:8000/graphql/' })),
  cache: new InMemoryCache(),
});

export default client;
