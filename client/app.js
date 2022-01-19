/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/routes.js';
import * as path from 'path';
import {fileURLToPath} from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(__dirname + '/src'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use('/', express.json(), routes).listen(process.env.CLIENT_PORT, () => {
	console.log('Starting Client on', process.env.CLIENT_PORT, '...');
});