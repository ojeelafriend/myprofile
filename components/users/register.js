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
			//trabajar el catch para asociarlo a una respuesta visual y no
			//mediante estados, etc...
			if (!e) {
				talkResponse.errors(req, res, 'User already exist', 400, e);
			} else {
				talkResponse.errors(req, res, 'Error data', 500, e);
			}
		});
});

module.exports = router;
