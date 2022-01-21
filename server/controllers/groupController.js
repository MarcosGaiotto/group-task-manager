import database from '../database/db.js';
import Group from '../models/Group.js';
import Sequelize from 'sequelize';

const groupController = {
	create: async function(req, res) {
		try {
			await database.sync();
			const createResult = await Group.create({
				name: req.body.name,
				createdBy: req.user.id,
				users: req.body.users
			});
			res.send(createResult);
		} catch (err) {
			res.status(400).send(err);
		}
	},

	getGroups: async function(req, res) {
		await database.sync();
		const op = Sequelize.Op;
		const getResult = await Group.findAll({
			where: {
				[op.or]: [
					{users: {[op.like]: req.user.id + ',%'}},
					{users: {[op.like]: '%,' + req.user.id + ',%'}},
					{users: {[op.like]: '%,' + req.user.id}}
				]
			}
		},);
		if(!getResult) return res.status(400).send('No results');
		else res.send(getResult);
	},

	delete: async function(req, res) {

	}
};

export default groupController;