import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import cors from 'cors';

dotenv.config({ path: './.env' });

// conexion db
connectDB();

const app = express();


// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

app.use('/public', express.static('storage/imgs'));
  
// parser middleware
app.use(express.json());

// Rutas
import authRoutes from './Routes/authRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import productRoutes from './Routes/productRoutes.js';
import courseRoutes from './Routes/courseRoutes.js';
import tipRoutes from './Routes/tipRoutes.js';
import recipeRoutes from './Routes/recipeRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/tips', tipRoutes);
app.use('/api/recipes', recipeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is corriendo at port ${PORT}`));