import express from 'express';

const routes = express.Router();


routes.get('/', (req, res) => {
	res.send('Acessando rota pelo server-side');
});

export default routes;