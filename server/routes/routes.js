import express from 'express';
import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';
import authController from '../controllers/authController.js';


const routes = express.Router();


routes.get('/', (req, res) => {
	res.send('Acessando rota pelo server-side');
});

routes.use('/user', userRoutes);

routes.use('/auth', authController, authRoutes);

export default routes;