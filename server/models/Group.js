import Sequelize from 'sequelize';
import database from '../database/db.js';

const groupSchema = database.define('group', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		required: true,
		minLength: 3,
		maxLength: 30
	},
	createdBy: {
		type: Sequelize.INTEGER,
		required: true,
		allowNull: false,
		references: {
			model: 'User',
			key: 'id'
		}
	},
	users: {
		type: Sequelize.STRING,
		minLength: 1,
		maxLength: 300
	}
});

export default groupSchema;