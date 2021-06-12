const db = require('./store');
const bcrypt = require('bcrypt');

// guardar json en mongo de la forma correspondiente.
async function register(username, password, confirmPassword) {
	return new Promise(async (resolve, reject) => {
		const userExists = await db.search(username);
		const errors = [];
		if (!username) {
			console.log('Insert a username');
			errors.push({ text: 'Insert a username' });
		}
		if (!password) {
			console.log('Inserte a password');
			errors.push({ text: 'Insert a password' });
		}
		if (username.length < 5) {
			console.log('The user must contain more than five words');
			errors.push({ text: 'The user must contain more than five words' });
		}
		if (password.length < 5) {
			console.log('The password is not secure, add more digits');
			errors.push({ text: 'The password is not secure, add more digits' });
		}
		if (password !== confirmPassword) {
			console.log('Password do not match');
			errors.push({ text: 'Password do not match' });
		}
		if (userExists !== null) {
			return reject(false);
		}
		if (errors.length > 0) {
			return reject(errors);
		}

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
