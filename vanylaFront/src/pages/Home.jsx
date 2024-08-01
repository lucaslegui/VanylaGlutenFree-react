import React, { useState, useEffect, useContext } from 'react';
import axios from "../api/axios.js";
import { RecipesComponent } from "../components/RecipesComponent.jsx";
import {CoursesComponent} from "../components/CoursesComponenet.jsx";
import { PostRecipe } from "../components/PostRecipe.jsx";
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const [products, setProducts] = useState([]);
    const { isAuthenticatedUser } = useContext(AuthContext);

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

    return (
        <div className="container">
            <h1>Bienvenido a la Pastelería Gluten Free</h1>
            <p>¡Disfruta de nuestros productos sin gluten!</p>
            <p>En nuestra pastelería encontrarás una gran variedad de productos sin gluten, para que puedas disfrutar de
                un dulce momento sin preocupaciones.</p>
            <section>
                <h2>Productos</h2>
                <p>Conoce nuestra variedad de productos sin gluten, desde tortas, cupcakes, galletas, panes y mucho
                    más.</p>
                <div className="row">
                    {products.map((product) => (
                        <div key={product._id} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={product.image} className="card-img-top" alt={product.name}
                                     style={{height: '200px', objectFit: 'cover'}}/>
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text"><small>Categoría: {product.category}</small></p>
                                    <p className="card-text price"><small>Precio: ${product.price}</small></p>
                                    <p className="card-text">
                                        <small>Disponibilidad: {product.availability ? 'Disponible' : 'No Disponible'}</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <RecipesComponent/>
            {isAuthenticatedUser() && <PostRecipe />}
            <CoursesComponent/>
        </div>
    );
};

export { Home };