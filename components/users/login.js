const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('pages/index.ejs');
});

router.post(
	'/',
	passport.authenticate('local', {
		successRedirect: '/panel',
		failureRedirect: '/user/signin',
	})
);

module.exports = router;
