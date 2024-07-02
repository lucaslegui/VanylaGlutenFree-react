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
  
// parser middleware
app.use(express.json());

// Rutas
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import tipRoutes from './routes/tipRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/tips', tipRoutes);
app.use('/api/recipes', recipeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is corriendo at port ${PORT}`));