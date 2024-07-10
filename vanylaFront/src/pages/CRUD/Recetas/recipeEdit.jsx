import React, { useState, useEffect } from 'react';
import axios from "../../../api/axios.js";
import { useParams, useNavigate } from 'react-router-dom';

const RecipeEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: '',
        steps: '',
        image: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`/recipes/${id}`);
                setRecipe(response.data);
            } catch (error) {
                console.error('Error', error);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe({
            ...recipe,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setNewImage(e.target.files[0]);
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('title', recipe.title);
            formData.append('ingredients', recipe.ingredients);
            formData.append('steps', recipe.steps);
            if (newImage) {
                formData.append('image', newImage);
            }

            await axios.put(`/recipes/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving the recipe:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div className="container mt-5">
            <h2>{isEditing ? 'Editar Receta' : 'Ver Receta'}</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Título</label>
                    <input type="text" className="form-control" id="title" name="title" value={recipe.title} onChange={handleChange} disabled={!isEditing} />
                </div>
                <div className="mb-3">
                    <label htmlFor="ingredients" className="form-label">Ingredientes</label>
                    <textarea className="form-control" id="ingredients" name="ingredients" value={recipe.ingredients} onChange={handleChange} disabled={!isEditing} />
                </div>
                <div className="mb-3">
                    <label htmlFor="instructions" className="form-label">Pasos</label>
                    <textarea className="form-control" id="instructions" name="instructions" value={recipe.steps} onChange={handleChange} disabled={!isEditing} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagen Actual</label>
                    <br />
                    <img src={recipe.image} alt="Receta" style={{ width: '200px' }} />
                </div>
                {isEditing && (
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Cambiar Imagen</label>
                        <input type="file" className="form-control" id="image" name="image" onChange={handleFileChange} />
                    </div>
                )}
                <div className="d-flex justify-content-between">
                    {isEditing ? (
                        <>
                            <button type="button" className="btn btn-primary" onClick={handleSave}>Guardar</button>
                            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                        </>
                    ) : (
                        <>
                            <button type="button" className="btn btn-primary" onClick={handleEdit}>Editar</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/recipes')}>Volver</button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export {RecipeEdit};
