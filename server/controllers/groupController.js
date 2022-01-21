import database from '../database/db.js';
import Group from '../models/Group.js';

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
	delete: async function(req, res) {

	}
};

export default groupController;