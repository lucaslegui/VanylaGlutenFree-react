import React from "react";
import {Routes, Route} from "react-router-dom";
import {AuthContextProvider} from "./context/AuthContext";
import Navbar from "./components/Navbar.jsx";
import {Home, Register, Login, UsersTable, EditUser, ProductsCreate, ProductsList, EditProduct} from "./pages/index.js";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";


function App() {
    return (
        <>
            <AuthContextProvider>
                <Navbar/>
                <Routes>
                    <Route element={<ProtectedRoutes/>}>

                        <Route path="/users" element={<UsersTable/>}/>
                        <Route path="/editUser/:id" element={<EditUser/>}/>
                        <Route path="/productsList" element={<ProductsList/>}/>
                        <Route path="/products/create" element={<ProductsCreate/>}/>
                        <Route path="/products/edit/:id" element={<EditProduct/>}/>
                    </Route>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </AuthContextProvider>
        </>
    );
}

export default App;