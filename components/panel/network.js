const express = require('express');
const router = express.Router();

router.get(
	'/',
	(req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/user/signin');
	},
	(req, res) => {
		res.send('Passport authenticated from local strategy');
	}
);

module.exports = router;
