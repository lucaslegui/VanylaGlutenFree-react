import React, { useState } from "react";
import api from '../api/axios.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', userData);
      localStorage.setItem('token', response.data.token);
      toast.success('Registro exitoso');
      navigate('/login');
    } catch (err) {
      setError('Error al registrarse');
      toast.error('Error al registrarse');
    }
  };

  return (
    <div className='container'>
      <h1>Registrarse</h1>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
        {error && <div className="alert alert-danger">{error}</div>}
      </form>
    </div>
  );
};

export { Register };