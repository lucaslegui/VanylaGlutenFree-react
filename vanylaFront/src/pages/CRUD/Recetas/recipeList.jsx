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
        <div className="container mt-4">
            <h2 className="text-center text-primary mb-4">Listado de Recetas</h2>
            {recipes.map((recipe, index) => (
                <div className="card mb-3 shadow-sm" key={index} style={{borderRadius: '10px', overflow: 'hidden'}}>
                    <div className="row g-0">
                        <div className="col-md-3">
                            <img src={recipe.image} alt={recipe.title} className="img-fluid"
                                 style={{objectFit: 'cover', height: '100%', borderRadius: '10px 0 0 10px'}}/>
                        </div>
                        <div className="col-md-9">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div> <Link to={`/recipes/edit/${recipe._id}`}>
                                        <h5 className="card-title text-decoration-none mb-2">{recipe.title}</h5>
                                    </Link>
                                        <p className="card-text">
                                            <strong>Ingredientes:</strong> {recipe.ingredients.join(', ')}</p>
                                    </div>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(recipe._id)}>Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export {RecipeList};