import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/products/${id}`, product, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      navigate('/products');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <form onSubmit={handleEditProduct}>
      <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Nombre" required />
      <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="Descripción" required />
      <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Categoría" required />
      <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Precio" required />
      <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="Imagen" required />
      <label>
        Disponibilidad:
        <input type="checkbox" name="availability" checked={product.availability} onChange={handleChange} />
      </label>
      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default EditProduct;