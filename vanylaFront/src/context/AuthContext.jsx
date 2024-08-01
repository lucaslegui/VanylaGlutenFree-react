import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const auth = Cookies.get('token') || null;

    useEffect(() => {
        if (auth) {
            const decoded = jwtDecode(auth);
            setUser({ name: decoded.user.name, email: decoded.user.email, role: decoded.user.role });
        }
    }, [auth]);

    const logout = () => {
        setUser(null);
        Cookies.remove('token');
        toast.dark("Sesión cerrada");
        navigate('/login');
    };

    const isAuthenticatedUser = () => {
        return user && user.role === 'user';
    };

    return (
        <AuthContext.Provider value={{ user, setUser, auth, isAuthenticatedUser ,logout }}>
            {children}
        </AuthContext.Provider>
    );
};