/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/routes.js';

dotenv.config();

const server = express();


server.use('/', express.json(), routes).listen(process.env.SERVER_PORT, () => {
	console.log('Starting Server on', process.env.SERVER_PORT, '...');
});