import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const PostRecipe = () => {
  const { isAuthenticatedUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState({
    title: '',
    ingredients: [],
    steps: '',
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setRecipeData({...recipeData, [name]: name === 'ingredients' ? value.split(',') : value});
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(recipeData).forEach(key => formData.append(key, recipeData[key]));
    if (file) {
      formData.append('image', file);
    }

    try {
      await axios.post('/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Receta creada!');
      window.location.reload();

    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al POSTEAR la receta');
    }
  };

  if (!isAuthenticatedUser()) return null;

  return (
    <div className="container mt-5">
      <h2>Publicar Nueva Receta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Titulo:</label>
          <input type="text" className="form-control" id="title" name="title" value={recipeData.title}
                 onChange={handleChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">Ingredientes (separados por comas)</label>
          <input type="text" className="form-control" id="ingredients" name="ingredients"
                 value={recipeData.ingredients.join(',')} onChange={handleChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="steps" className="form-label">Pasos</label>
          <textarea className="form-control" id="steps" name="steps" value={recipeData.steps}
                    onChange={handleChange} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Imagen:</label>
          <input type="file" className="form-control" id="image" name="image" onChange={handleFileChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Postear</button>
      </form>
    </div>
  );
};

export { PostRecipe };