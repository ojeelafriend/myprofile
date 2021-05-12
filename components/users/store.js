const Model = require('./model');

function addUser(user) {
	const myUser = new Model(user);
	myUser.save();
}
async function searchUser(username) {
	User = await Model.findOne({
		username: username,
	});
	return User;
}
module.exports = {
	add: addUser,
	search: searchUser,
};
