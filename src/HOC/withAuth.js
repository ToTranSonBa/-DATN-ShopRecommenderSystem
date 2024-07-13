// withAuth.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (Component, allowedRoles) => {
    return (props) => {
        const token = localStorage.getItem('token');
        const roles = JSON.parse(localStorage.getItem('roles')) || [];

        if (!token) {
            return <Navigate to="/login" />;
        }

        if (allowedRoles && !allowedRoles.some(role => roles.includes(role))) {
            return <Navigate to="/" />;
        }

        return <Component {...props} />;
    };
};

export default withAuth;