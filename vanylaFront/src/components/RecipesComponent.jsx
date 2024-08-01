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
            <h2 className="recipes-title text-center text-danger mb-4">Recetas</h2>
            <p className="recipes-description text-center mb-4">Descubre nuestra variedad de recetas sin gluten, desde
                postres, panes,
                pasteles y mucho más.</p>
            <div className="accordion" id="recipesAccordion">
                {recipes.map((recipe, index) => (
                    <div className="accordion-item mb-3" key={index}>
                        <h2 className="accordion-header" id={`heading${index}`}>
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${index}`}
                                aria-expanded="false"
                                aria-controls={`collapse${index}`}
                            >
                                <div className="d-flex align-items-center">
                                    <img src={recipe.image} alt={recipe.title} className="img-thumbnail"
                                         style={{width: '100px', marginRight: '15px'}}/>
                                    <div>
                                        <h5 className="mb-0">{recipe.title}</h5>
                                        <p className="mb-0">
                                            <strong>Ingredientes:</strong> {recipe.ingredients.join(', ')}</p>
                                    </div>
                                </div>
                            </button>
                        </h2>
                        <div
                            id={`collapse${index}`}
                            className="accordion-collapse collapse"
                            aria-labelledby={`heading${index}`}
                            data-bs-parent="#recipesAccordion"
                        >
                            <div className="accordion-body">
                                <h6><strong>Pasos:</strong></h6>
                                <p>{recipe.steps}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export {RecipesComponent};