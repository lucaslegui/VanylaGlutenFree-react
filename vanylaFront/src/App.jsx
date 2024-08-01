import React from "react";
import {Routes, Route} from "react-router-dom";
import {AuthContextProvider} from "./context/AuthContext";
import Navbar from "./components/Navbar.jsx";
import {RecipesComponent} from "./components/RecipesComponent.jsx";
import {Home, Register, Login, UsersTable, EditUser, ProductsCreate, ProductsList, EditProduct, RecipeList, RecipeCreate, RecipeEdit, CoursesList, EditCourse, CourseCreate} from "./pages/index.js";
import {FooterComponent} from "./components/FooterComponenet.jsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';


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
                        <Route path="/recipes" element={<RecipeList/>}/>
                        <Route path="/recipes/create" element={<RecipeCreate/>}/>
                        <Route path="/recipes/edit/:id" element={<RecipeEdit/>}/>
                        <Route path="/courses" element={<CoursesList/>}/>
                        <Route path="/courses/create" element={<CourseCreate/>}/>
                        <Route path="/courses/edit/:id" element={<EditCourse/>}/>
                    </Route>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
                <FooterComponent/>
            </AuthContextProvider>
        </>
    );
}

export default App;