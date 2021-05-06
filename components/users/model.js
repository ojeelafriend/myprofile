const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
	username: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	creation: {
		type: Date,
		require: true,
	},
});

const model = mongoose.model('Users', mySchema);
module.exports = model;
