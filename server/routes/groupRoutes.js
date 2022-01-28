import express from 'express';
import groupController from '../controllers/groupController.js';


const routes = express.Router();

routes.post('/create', groupController.create);
routes.post('/delete', groupController.delete);


export default routes;