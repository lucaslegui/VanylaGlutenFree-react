import React, { useContext, useEffect, useState } from 'react';
import axios from '../../../api/axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { toast } from "react-toastify";

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('/recipes');
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`/recipes/${id}`, { headers: { 'token': auth } })
            .then(() => {
                setRecipes(recipes.filter((recipe) => recipe._id !== id));
                toast('Receta eliminada');
            })
            .catch((error) => {
                console.error('Error', error);
                toast.error('Error al eliminar la receta');
            });
    };

    return (
        <div className="container mt-5">
            <h2>Listado de Recetas</h2>
            <div className="list-group">
                {recipes.map((recipe) => (
                    <div key={recipe._id} className="list-group-item list-group-item-action">
                        <Link to={`/recipes/edit/${recipe._id}`}>
                            <h5 className="mb-1">{recipe.title}</h5>
                            <p>Ingredients: {recipe.ingredients.join(', ')}</p>
                            <img src={recipe.image} alt={recipe.title} style={{width: '100px', height: '100px'}}/>
                        </Link>
                        <button onClick={() => handleDelete(recipe._id)} className="btn btn-danger">Eliminar</button>
                    </div>
                ))}
            </div>
            <Link to="/recipes/create" className="btn btn-primary mt-3">Nueva Receta</Link>
        </div>
    );
};

export { RecipeList };