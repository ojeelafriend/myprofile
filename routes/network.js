const userPanel = require('../components/panel/network');
const users = require('../components/users/network');

const routes = (server) => {
	server.use('/panel', userPanel);
	server.use('/users', users);
};

module.exports = routes;
