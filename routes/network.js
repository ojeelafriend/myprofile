const register = require('../components/users/register');
const login = require('../components/users/login');
const userPanel = require('../components/panel/network');

const routes = (server) => {
	server.use('/user/signup', register);
	server.use('/user/signin', login);
	server.use('/panel', userPanel);
};

module.exports = routes;
