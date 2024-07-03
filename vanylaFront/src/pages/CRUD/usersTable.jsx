import React, {useEffect, useState, useContext} from 'react'
import {AuthContext} from "../../context/AuthContext";
import axios from "../../api/axios.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const {auth} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get('/users', {headers: {'token': auth}})
            .then((res) => {
                console.log(res.data);
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })

    }, [])

    const deleteUser = (id) => {
        axios.delete(`/users/${id}`, {headers: {'token': auth}})
            .then((res) => {
                console.log(res.data);
                setUsers(users.filter((user) => user._id !== id));
                toast("Usuario eliminado")
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const editUser = (id) => {
        console.log(id);
        navigate(`/editUser/${id}`);
    };

    return (
        <>

            {loading && <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}

            <div className="container">
                <h1>Tabla de Usuarios</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo Electrónico</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => editUser(user._id)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export {UsersTable};
