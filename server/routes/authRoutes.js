import express from 'express';
import groupRoutes from './groupRoutes.js';
import taskRoutes from './taskRoutes.js';

const routes = express.Router();

routes.get('/', (req, res) => {
	res.json(req.user);
});

routes.use('/group', groupRoutes);

routes.use('/task', taskRoutes);



export default routes;