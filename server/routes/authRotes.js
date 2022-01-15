import express from 'express';

const routes = express.Router();

routes.get('/painel', (req, res) => {
	res.json(req.user);
});   



export default routes;