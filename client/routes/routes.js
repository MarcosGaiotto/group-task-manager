import express from 'express';
import axios from 'axios';
import authRoutes from './authRoutes.js';

const routes = express.Router();


routes.get('/', async (req, res) => {
	if(req.query.token){
		let config = {
			headers: {
				'authorization-token': req.query.token
			}
		};
		const userAuth = await axios.get('http://localhost:3000/auth/', config)
			.then((response) => {
				return response.data;
			})
			.catch((err) => {
				console.error(err);
			});
		if(!userAuth) res.send('Error');
		else {
			const userGroups = await axios.get('http://localhost:3000/auth/group/get', config)
				.then(response => {
					return response.data;
				})
				.catch((err) => {
					console.error(err);
				});
			console.log(userGroups);
			if (!userGroups) res.send('Error');
			else res.render('index', {user: userAuth.name, token: req.query.token, groups: userGroups});
		}
	} else res.render('index', {user: '', token: ''});
});

routes.use('/auth', express.urlencoded(), authRoutes);






export default routes;