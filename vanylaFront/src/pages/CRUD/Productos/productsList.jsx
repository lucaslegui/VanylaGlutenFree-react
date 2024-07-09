import React, {useEffect, useState, useContext} from 'react';
import axios from "../../../api/axios.js";
import {AuthContext} from '../../../context/AuthContext';
import {Link} from 'react-router-dom';
import {toast} from "react-toastify";

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const {auth} = useContext(AuthContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`/products/${id}`, {headers: {'token': auth}})
            .then(() => {
                setProducts(products.filter((product) => product._id !== id));
                toast('Producto eliminado');
            })
            .catch((error) => {
                console.error('Error deleting product:', error);
                toast.error('Error al eliminar el producto');
            });
    }

    return (
        <div className="container mt-5">
            <h2>Listado de Productos</h2>
            <div className="list-group">
                {products.map((product) => (
                    <div key={product._id} className="list-group-item list-group-item-action" aria-current="true">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{product.name}</h5>
                            <small>{product.availability ? 'Disponible' : 'No Disponible'}</small>
                        </div>
                        <p className="mb-1">{product.description}</p>
                        <small>Categoría: {product.category}</small>
                        <br/>
                        <small>Imagen:
                            <img src={product.image} alt={product.name} style={{width: '100px'}}/>
                        </small>
                        <br/>

                        <small>Precio: {product.price}</small>
                        <small>Disponibilidad: {product.availability ? 'Disponible' : 'No Disponible'}</small>

                        <div>
                            {/*<Link to={`/products/view/${product._id}`} className="btn btn-primary">Ver</Link>*/}
                            <Link to={`/products/edit/${product._id}`} className="btn btn-secondary">Editar</Link>
                            <button onClick={() => handleDelete(product._id)} className="btn btn-danger">Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/products/create" className="btn btn-primary mt-3">Crear Producto</Link>
        </div>
    );
};

export {ProductsList};