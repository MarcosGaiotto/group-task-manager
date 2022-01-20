import express from 'express';
import taskController from '../controllers/taskController.js';

const routes = express.Router();

routes.post('/create', taskController.create);
routes.post('/delete', taskController.delete);

export default routes;