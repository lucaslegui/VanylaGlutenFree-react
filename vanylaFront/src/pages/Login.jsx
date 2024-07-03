import React, {useState, useContext} from "react";
import axios from "../api/axios.js";
import {toast} from "react-toastify";
import {AuthContext} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const {setUser} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/login", userData);
            console.log(res.data);
            setUser(res.data.user);
            Cookies.set("token", res.data.token, {expires: 3});
            toast.success("Inicio de sesión exitoso")
            navigate("/");
        } catch (err) {
            console.log(err);
            toast.error("Error al iniciar sesión")
        }
    };

    return (
        <div className="container">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input type="email" className="form-control" id="email" value={userData.email}
                           onChange={(e) => setUserData({...userData, email: e.target.value})}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="password" value={userData.password}
                           onChange={(e) => setUserData({...userData, password: e.target.value})}/>
                </div>
                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export {Login};