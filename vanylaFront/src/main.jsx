import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
// import './index.css';
import {ToastContainer} from 'react-toastify';
import {AuthContextProvider} from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthContextProvider>
            <App/>
        </AuthContextProvider>
        <ToastContainer/>
    </BrowserRouter>
);
