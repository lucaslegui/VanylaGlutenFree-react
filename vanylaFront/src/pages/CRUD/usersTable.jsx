import React, {useEffect, useState, useContext} from 'react'
import {AuthContext} from "../../context/AuthContext";


import axios from "../../api/axios.js";

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState([]);
    const {auth} = useContext(AuthContext);

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
                                <button className="btn btn-primary">Editar</button>
                                <button className="btn btn-danger">Eliminar</button>
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
