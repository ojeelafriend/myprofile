const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
	user: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	creation: Date,
});

const model = mongoose.model('Users', mySchema);
module.exports = model;
