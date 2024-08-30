import React, { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/ad/login" />;
};

export default PrivateRoute;
