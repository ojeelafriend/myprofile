const db = require('./store');
const bcrypt = require('bcrypt');

// guardar json en mongo de la forma correspondiente.
function register(username, password, confirmPassword) {
	return new Promise(async (resolve, reject) => {
		console.log(username);
		if (!username || !password || !confirmPassword) {
			reject('Error, insert data...');
		} else {
			let fails = [];
			if (username.length < 5) {
				fails.push('Username minimum 5 digits');
			}
			if (username.length > 16) {
				fails.push('Username maximum 16 digits');
			}
			if (password.length < 8) {
				fails.push('Password minimum 8 digits');
			}
			if (confirmPassword != password) {
				fails.push('Password do not match');
			}
			if (fails.length != 0) {
				reject('fails: ' + fails);
			} else {
				const SALT = 12;
				const hashedPassword = await bcrypt.hash(password, SALT).catch((e) => {
					reject('[Error proccess bcrypt]: ', e);
				});

				const user = {
					username: username,
					password: hashedPassword,
					creation: new Date(),
				};
				db.add(user);
				resolve('User register successfully');
			}
		}
	});
}

function auth(username, password) {
	return new Promise(async (resolve, reject) => {
		const userExists = await db.search(username);
		if (userExists == null) {
			reject(false);
		} else {
			let value = bcrypt.compareSync(password, userExists.password);
			if (value && username === userExists.username) {
				return resolve(userExists);
			}
			reject(false);
		}
	});
}

module.exports = {
	register: register,
	auth: auth,
};
