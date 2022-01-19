import express from 'express';
import axios from 'axios';

const routes = express.Router();

routes.get('/login', (req, res) => {
	res.render('login');
});

routes.post('/login', async (req, res) => {
	const response = await axios.post('http://localhost:3000/user/login', req.body)
		.then((response) => {
			return {status: response.status, token: response.headers['authorization-token']};
		}).catch((err) => {
			return {status: err.response.status, error: err.response.data};
		});
	if(response.status != 200) res.status(400).header('message', response.error).send();
	else {
		res.header('authorization-token', response.token);
		res.send(response.token);
	}
});   



export default routes;