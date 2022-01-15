import express from 'express';
import userRotes from './userRoutes.js';
import authRotes from './authRotes.js';
import authController from '../controllers/authController.js';

const routes = express.Router();


routes.get('/', (req, res) => {
	res.send('Acessando rota pelo server-side');
});

routes.use('/user', userRotes);

routes.use('/auth', authController, authRotes);

export default routes;