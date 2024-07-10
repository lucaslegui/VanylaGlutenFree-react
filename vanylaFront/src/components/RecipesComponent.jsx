import React, {useState, useEffect} from 'react';
import axios from "../api/axios.js";

const RecipesComponent = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('/recipes');
                setRecipes(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <section className="recipes-section">
            <h2 className="recipes-title">Recetas</h2>
            <p className="recipes-description">Descubre nuestra variedad de recetas sin gluten, desde postres, panes,
                pasteles y mucho más.</p>
            <div className="recipes-container">
                {recipes.map((recipe) => (
                    <div key={recipe._id} className="recipe-card">
                        <div className="recipe-image">
                            <img src={recipe.image} alt={recipe.title}/>
                        </div>
                        <div className="recipe-details">
                            <h5 className="recipe-title">{recipe.title}</h5>
                            <h6>Ingredientes:</h6>
                            <p className="recipe-ingredients">{recipe.ingredients.join(', ')}</p>
                            <h6>Pasos:</h6>
                            <p className="recipe-steps">{recipe.steps}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export {RecipesComponent};