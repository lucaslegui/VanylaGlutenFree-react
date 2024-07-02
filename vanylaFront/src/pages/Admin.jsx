import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPanel from '../components/AdminPanel';
import Users from './CRUD/Users';
import Products from './CRUD/Products';
import Tips from './CRUD/Tips';
import Recipes from './CRUD/Recipes';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { user } = useAuth();

  if (user && user.role === 'admin') {
    return (
      <div className="admin-container">
        <aside className="admin-panel">
          <AdminPanel />
        </aside>
        <div className="admin-content">
          <Routes>
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
            <Route path="tips" element={<Tips />} />
            <Route path="recipes" element={<Recipes />} />
          </Routes>
        </div>
      </div>
    );
  } else {
    return <p>No tienes acceso a esta sección</p>;
  }
};

export default Admin;