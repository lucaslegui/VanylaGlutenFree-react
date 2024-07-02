import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/admin/users">Usuarios</Link></li>
        <li><Link to="/admin/products">Productos</Link></li>
        <li><Link to="/admin/tips">Tips</Link></li>
        <li><Link to="/admin/recipes">Recetas</Link></li>
      </ul>
    </nav>
  );
};

export default AdminPanel;
