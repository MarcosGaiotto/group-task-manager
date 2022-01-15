import express from 'express';

const routes = express.Router();


routes.get('/', (req, res) => {
	res.redirect('/login');
});

routes.get('/login', (req, res) => {
	res.render('index');
});

routes.get('/register', (req, res) => {
	res.render('index');
});


export default routes;