import React from "react";
import {Routes, Route} from "react-router-dom";
import {AuthContextProvider} from "./context/AuthContext";
import Navbar from "./components/Navbar.jsx";
import {Home, Register, Login, UsersTable} from "./pages/index.js";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";



function App() {
  return (
    <>
        <AuthContextProvider>
      <Navbar />
        <Routes>
            <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<UsersTable />} />
        </Routes>

        </AuthContextProvider>
    </>
  );
}

export default App;