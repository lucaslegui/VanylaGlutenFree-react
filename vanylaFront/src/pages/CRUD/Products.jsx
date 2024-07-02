import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get('/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div>
      <h2>Administrar Productos</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} 
            <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
