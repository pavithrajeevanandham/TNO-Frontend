import { jwtDecode } from 'jwt-decode';
import { gql } from '@apollo/client';
import client from './apolloClient';

 

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    loginMutation(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const login = async (email, password) => {
  console.log(email, password);
  try {
    const result = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password },
    });

    const token = result.data.tokenAuth;
    console.log(result.data.tokenAuth);
    localStorage.setItem('token', token.token);
  } catch (error) {
    console.error('Error during login mutation:', error);
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};


// useEffect(() => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     const decoded = jwtDecode(token);
//     const now = Date.now() / 1000;
//     if (decoded.exp > now) {
//       setIsAuth(true);
//       setRole(decoded.role); // Ensure your token contains role information
//     }
//   }
// }, []);

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  console.log(token);
  if (!token) return false;

  const decoded = jwtDecode(token);
  const now = Date.now() / 1000;
  return decoded.exp > now;
};
