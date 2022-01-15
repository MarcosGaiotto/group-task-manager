/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/routes.js';

dotenv.config();

const app = express();


app.use('/', routes).listen(process.env.CLIENT_PORT, () => {
	console.log('Starting Client on', process.env.CLIENT_PORT, '...');
});