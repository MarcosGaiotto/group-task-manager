import Sequelize from 'sequelize';
import database from '../database/db.js';

const taskSchema = database.define('taskSchema', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		required: true,
		allowNull: false,
		minLength: 3,
		maxLength: 50
	},
	description: {
		type: Sequelize.STRING,
		required: true,
		allowNull: false,
		minLength: 3,
		maxLength: 300
	},
	createdBy: {
		type: Sequelize.INTEGER,
		required: true,
		allowNull: false,
		references: {
			model: 'users',
			key: 'id'
		}
	},
	group: {
		type: Sequelize.INTEGER,
		required: true,
		allowNull: false,
		references: {
			model: 'groups',
			key: 'id'
		}
	}
});

export default taskSchema;