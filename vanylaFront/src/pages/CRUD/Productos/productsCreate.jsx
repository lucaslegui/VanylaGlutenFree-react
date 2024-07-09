import React, {useState} from 'react';
import axios from "../../../api/axios.js";
import {toast} from 'react-toastify';
import {useNavigate} from "react-router-dom";

const ProductsCreate = () => {
    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        name: '', description: '', category: '', price: '', availability: true,
    });
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setProductData({
            ...productData, [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(productData).forEach(key => formData.append(key, productData[key]));
        if (file) {
            formData.append('image', file);
        }

        try {
            const response = await axios.post('/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Producto creado!');
            console.log(response.data);
            navigate('/productsList');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al crear el producto');
        }
    };

    return (<div className="container mt-5">
            <h2>Crear Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre:</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción:</label>
                    <textarea className="form-control" id="description" name="description" onChange={handleChange}
                              required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Categoría:</label>
                    <input type="text" className="form-control" id="category" name="category" onChange={handleChange}
                           required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Precio:</label>
                    <input type="number" className="form-control" id="price" name="price" onChange={handleChange}
                           required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Imagen:</label>
                    <input type="file" className="form-control" id="image" name="image" onChange={handleFileChange}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="availability" name="availability"
                           onChange={handleChange}/>
                    <label className="form-check-label" htmlFor="availability">Disponible</label>
                </div>
                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
        </div>);
}

export {ProductsCreate};