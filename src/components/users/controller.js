const db = require('./store');

function register(username, password) {
	return new Promise((resolve, reject) => {
		if (!username || !password) {
			reject('Error, not username or password');
		} else {
			const user = {
				username: username,
				password: password,
				create: new Date(),
			};
			db.add(user);
			resolve('');
		}
	});
}
module.exports = {
	register: register,
};
