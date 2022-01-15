/* eslint-disable no-undef */
import database from '../database/db.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const userController = {
	register: async function(req, res) {
		
		try {
			await database.sync();
			const createResult = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password)
			});
			res.send(createResult);
		} catch (err) {
			res.status(400).send(err);
		}
        
	},

	login: async function(req, res) {
		const selectedUser = await User.findOne({where: {email: req.body.email}});
		if(!selectedUser) return res.status(400).send('Invalid username or password');

		const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password);
		if(!passwordAndUserMatch) return res.status(400).send('Invalid username or password');

		const token = jwt.sign({id: selectedUser.id, name: selectedUser.name, email: selectedUser.email}, process.env.TOKEN_SECRET);

		res.header('authorization-token', token);
		res.send('User logged');
	}
};

export default userController;