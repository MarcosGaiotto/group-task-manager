import express from 'express';
import userController from '../controllers/userController.js';

const routes = express.Router();

routes.post('/login', userController.login);   

routes.post('/register', userController.register);

export default routes;