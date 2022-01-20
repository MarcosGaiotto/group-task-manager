import express from 'express';
import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';
import groupRoutes from './groupRotes.js';
import taskRoutes from './taskRotes.js';
import authController from '../controllers/authController.js';
import { route } from 'express/lib/application';

const routes = express.Router();


routes.get('/', (req, res) => {
	res.send('Acessando rota pelo server-side');
});

routes.use('/user', userRoutes);

routes.use('/auth', authController, authRoutes);

route.use('/group', groupRoutes);

route.use('/task', taskRoutes);

export default routes;