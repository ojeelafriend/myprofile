const Model = require('./model');

function addUser(user) {
	const myUser = new Model(user);
	myUser.save();
}
async function searchUser(username) {
	const User = await Model.findOne({
		username: username,
	});
	console.log(User);
	return User;
}
module.exports = {
	add: addUser,
	search: searchUser,
};
