import React, {useState} from 'react';
import axios from '../../../api/axios';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const RecipeCreate = () => {
    const navigate = useNavigate();
    const [recipeData, setRecipeData] = useState({
        title: '',
        ingredients: [],
        steps: '',
    });
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === 'ingredients') {
            setRecipeData({...recipeData, [name]: value.split(',')});
        } else {
            setRecipeData({...recipeData, [name]: value});
        }
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
            navigate('/recipes');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al crear la receta');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Crear Nueva Receta</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Titulo:</label>
                    <input type="text" className="form-control" id="title" name="title" value={recipeData.title}
                           onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="ingredients" className="form-label">Ingredientes (separados por comas)</label>
                    <input type="text" className="form-control" id="ingredients" name="ingredients"
                           value={recipeData.ingredients.join(',')} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="steps" className="form-label">Pasos</label>
                    <textarea className="form-control" id="steps" name="steps" value={recipeData.steps}
                              onChange={handleChange}></textarea>
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

export {RecipeCreate};