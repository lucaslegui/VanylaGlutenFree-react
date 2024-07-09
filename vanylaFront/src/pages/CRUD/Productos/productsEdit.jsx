import React, {useState, useEffect, useContext} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from '../../../api/axios';
import {AuthContext} from '../../../context/AuthContext';
import {toast} from 'react-toastify';

const EditProduct = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        image: '',
        availability: false,
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/products/${id}`, {headers: {'token': auth}});
                setProduct(response.data);
            } catch (error) {
                console.error(error);
                toast.error('Error al cargar el producto');
            }
        };
        fetchProduct();
    }, [id, auth]);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/products/${id}`, product, {headers: {'token': auth}});
            toast.success('Producto actualizado con éxito');
            navigate('/productsList');
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Error al actualizar el producto');
        }
    };


    return (
        <div className="container">
            <h2>Editar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="name" name="name" value={product.name}
                           onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <textarea className="form-control" id="description" name="description" value={product.description}
                              onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Categoría</label>
                    <input type="text" className="form-control" id="category" name="category" value={product.category}
                           onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Precio</label>
                    <input type="number" className="form-control" id="price" name="price" value={product.price}
                           onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Imagen</label>
                    <input type="text" className="form-control" id="image" name="image" value={product.image}
                           onChange={handleChange} required/>
                    <img src={product.image} alt={product.name} style={{width: '100px'}}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="availability" name="availability"
                           checked={product.availability} onChange={handleChange}/>
                    <label className="form-check-label" htmlFor="availability">Disponible</label>
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </div>
    );
}

export {EditProduct};
