import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await api.get('/recipes');
      setRecipes(response.data);
    };
    fetchRecipes();
  }, []);

  const deleteRecipe = async (id) => {
    await api.delete(`/recipes/${id}`);
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  return (
    <div>
      <h2>Administrar Recetas</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            {recipe.name} 
            <button onClick={() => deleteRecipe(recipe.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipes;
