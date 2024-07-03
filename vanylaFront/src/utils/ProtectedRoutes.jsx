import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const { user } = useContext(AuthContext);
    return (
       user ? <Outlet/> : <Navigate to="/login"/>
    );
}

export default ProtectedRoutes;