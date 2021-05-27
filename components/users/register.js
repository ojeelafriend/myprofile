const express = require('express');
const router = express.Router();
const controller = require('./controller');
const talkResponse = require('../../routes/response');

router.post('/', (req, res) => {
	controller
		.register(req.body.username, req.body.password, req.body.confirmPassword)
		.then((notice) => {
			talkResponse.success(req, res, notice, 201);
		})
		.catch((e) => {
			talkResponse.errors(req, res, 'Error data', 500, e);
		});
});

module.exports = router;
