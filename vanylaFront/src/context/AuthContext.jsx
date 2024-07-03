import React, {createContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const auth = Cookies.get('token') || null;

    useEffect(() => {
        if (auth) {
            const decoded = jwtDecode(auth);
            setUser({name: decoded.user.name, email: decoded.user.email, role: decoded.user.role})
        }
    }, [])


    return (
        <AuthContext.Provider value={{user, setUser, auth}}>
            {children}
        </AuthContext.Provider>
    )

}