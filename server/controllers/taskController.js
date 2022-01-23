import database from '../database/db.js';
import Task from '../models/Task.js';

const taskController = {
	create: async function(req, res) {
		try {
			await database.sync();
			const createResult = await Task.create({
				name: req.body.name,
				description: req.body.description,
				createdBy: req.user.id,
				group: req.group.id
			});
			res.send(createResult);
		} catch (err) {
			res.status(400).send(err);
		}
	},
	delete: async function(req, res) {
		await database.sync();
		const deleteResult = await Task.findOne({
			where: { id: req.body.id }
		});
		if(!deleteResult) return res.status(400).send('Task not found');
		if(deleteResult.createdBy != req.user.id) return res.status(400).send('You don\'t have permission to delete this task');
		await deleteResult.destroy();
		res.send('Success');
	}
};

export default taskController;