import database from '../database/db.js';
import Group from '../models/Group.js';
import User from '../models/User.js';
import Sequelize from 'sequelize';

const groupController = {
	create: async function(req, res) {
		try {
			await database.sync();
			const createResult = await Group.create({
				name: req.body.name,
				createdBy: req.user.id,
			});
			const usersArray = Object.keys(req.body.users).map((key) => req.body.users[key]);
			usersArray.forEach(async (user) => {
				let userData = await User.findOne({where: {id: user.id}});
				let groupsArray = (userData.groups != null) ? JSON.parse(userData.groups) : [];
				groupsArray.push({id:createResult.id});
				userData.update({'groups': JSON.stringify(groupsArray)});
			});
			res.send(createResult);
		} catch (err) {
			res.status(400).send(err);
		}
	},

	delete: async function(req, res) {
		try {
			await database.sync();
			const deleteResult = await Group.findOne({
				where: { id: req.body.id }
			});
			if(!deleteResult) return res.status(404).send('Group not found');
			if(deleteResult.createdBy != req.user.id) return res.status(404).send('You don\'t have permission to delete this group');
			const op = Sequelize.Op;
			let userData = await User.findAll({
				where: {
					groups: { 
						[op.like]: '%"id":' + req.body.id + '%'
					}
				}
			});
			userData.forEach((user) => {
				let groupsArray = JSON.parse(user.dataValues.groups);
				const idToDelete = groupsArray.findIndex(function (group) {
					return group.id == req.body.id;
				});
				groupsArray.splice(idToDelete,1);
				user.update({'groups': JSON.stringify(groupsArray)});
			});
			await deleteResult.destroy();
			res.send('Success');
		} catch (err) {
			res.status(400).send(err);
		}
	},

	getGroups: async function (req, res) {
		try {
			const groupsArray = JSON.parse(req.user.groups).map((g) => {
				return g.id;
			});
			await database.sync();
			const op = Sequelize.Op;
			const getGroupsResult = await Group.findAll({
				where: {
					id: {
						[op.or]: groupsArray
					}
				}
			});
			res.send(getGroupsResult);
		} catch (err) {
			res.status(400).send(err);
		}
	}
};

export default groupController;