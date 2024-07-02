import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [tips, setTips] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsRes = await api.get('/products');
      const tipsRes = await api.get('/tips');
      const recipesRes = await api.get('/recipes');
      setProducts(productsRes.data);
      setTips(tipsRes.data);
      setRecipes(recipesRes.data);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Bienvenido a la Pastelería Gluten Free</h1>
      <p>Explora nuestros deliciosos productos sin gluten, aprende nuevas recetas y participa en nuestros cursos de cocina.</p>
      <div>
        <h2>Productos</h2>
        {products.map(product => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
      <div>
        <h2>Consejos</h2>
        {tips.map(tip => (
          <div key={tip.id}>{tip.name}</div>
        ))}
      </div>
      <div>
        <h2>Recetas</h2>
        {recipes.map(recipe => (
          <div key={recipe.id}>{recipe.name}</div>
        ))}
      </div>
      {user && user.role === 'user' && (
        <div>
          <h2>Postear Nuevo Contenido</h2>
          {/* Formulario para postear nuevo contenido */}
        </div>
      )}
    </div>
  );
};

export default Home;
