import express from 'express';
import axios from 'axios';
import authRoutes from './authRoutes.js';

const routes = express.Router();


routes.get('/', async (req, res) => {
	console.log(req.header['Authorization-token']);
	if(req.query.token){
		let config = {
			headers: {
				'authorization-token': req.query.token
			}
		};
		const response = await axios.get('http://localhost:3000/auth/', config)
			.then((response) => {
				return response.data;
			})
			.catch((err) => {
				console.error(err);
			});
		if(!response) res.send('Error');
		else res.render('index', {user: response.name, token: req.query.token});
	
	} else res.render('index', {user: '', token: ''});
});

routes.use('/auth', express.urlencoded(), authRoutes);






export default routes;