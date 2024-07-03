import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/CRUD/Products';
import Courses from './pages/CRUD/Courses';
import Tips from './pages/CRUD/Tips';
import Recipes from './pages/CRUD/Recipes';
import Admin from './pages/CRUD/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {user?.role === 'admin' && (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users" element={<Admin />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
