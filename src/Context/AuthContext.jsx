import React, { createContext, useState, useEffect } from 'react';
import axios from "axios"
import {jwtDecode} from 'jwt-decode';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => {
        const token = localStorage.getItem('authTokens');
        return token ? JSON.parse(token) : null;
    });
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('authTokens');
        return token ? jwtDecode(JSON.stringify(JSON.parse(token).access)) : null;
    });

    const loginUser = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username,
                password
            });
            setAuthTokens(response.data);
            setUser(jwtDecode(response.data.access));
            localStorage.setItem('authTokens', JSON.stringify(response.data));
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
    };

    const updateToken = async () => {
        if (authTokens) {
            try {
                const response = await axios.post('http://localhost:8000/api/token/refresh/', {
                    refresh: authTokens.refresh
                });
                setAuthTokens(response.data);
                setUser(jwtDecode(response.data.access));
                localStorage.setItem('authTokens', JSON.stringify(response.data));
            } catch (error) {
                console.error('Token refresh failed:', error);
                logoutUser();
            }
        }
    };

    useEffect(() => {
        let interval = setInterval(() => {
            if (authTokens) {
                const tokenExp = jwtDecode(authTokens.access).exp * 1000;
                const now = Date.now();
                if (tokenExp - now < 60000) { // Refresh 1 minute before expiration
                    updateToken();
                }
            }
        }, 30000); // Check every 30 seconds

        return () => clearInterval(interval);
    }, [authTokens]);

    const contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
