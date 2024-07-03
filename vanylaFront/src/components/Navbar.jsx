import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const Navbar = () => {
    const {user, logout} = useContext(AuthContext);
    return (
        <>
            <header>
                {user?.name ? <h1>Hola, {user.name}</h1> : <p>no estas logueado</p>}
                <nav className="navbar navbar-expand-lg navbar-custom">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='/'>HOME</NavLink>
                                </li>
                                {user && user.role === 'admin' && <li className="nav-item">
                                    <NavLink className="nav-link" to='/users'>USERS</NavLink>
                                </li>}

                                {!user && <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to='/login'>LOGIN</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to='/register'>REGISTER</NavLink>
                                    </li>
                                </>}
                                {user && <li className="nav-item">
                                    <NavLink className="nav-link" onClick={logout} to='/login'>LOGOUT</NavLink>
                                </li>}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navbar;
