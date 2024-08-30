import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './Router';
import { ApolloProvider } from '@apollo/client';
import './index.css';
import client from './config/apolloClient';
import  AuthProvider from './Context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </ApolloProvider>
    </React.StrictMode>
);