const express = require('express');
const router = express.Router();
const controller = require('./controller');
const talkResponse = require('../../routes/response');

router.get('/', (req, res) => {
	res.render('pages/index.ejs');
});

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

router.get('/', (req, res) => {
	controller
		.auth(req.body.username, req.body.password)
		.then((notice) => {
			talkResponse.success(req, res, notice, 200);
		})
		.catch((error) => {
			talkResponse.errors(req, res, error, 401, error);
		});
});

module.exports = router;
