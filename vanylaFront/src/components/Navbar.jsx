import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";


const Navbar = () => {
    const {user} = useContext(AuthContext)
    return (
        <>
            <header>

                {user?.name ? <h1>Bienvenido {user.name}</h1> : <h3>logged out</h3>}


                <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                                    <NavLink to='/'>HOME</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/login'>LOGIN</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/register'>REGISTER</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/users'>USERS</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Navbar;
