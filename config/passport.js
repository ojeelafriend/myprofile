const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const controller = require('../components/users/controller');
let User = {};

passport.use(
	new LocalStrategy((username, password, done) => {
		console.log(username, password);
		if (!username || !password) {
			return done(null, false);
		}
		controller
			.auth(username, password)
			.then((userExists) => {
				console.log('aca');
				done(null, userExists);
				User = userExists;
			})
			.catch((e) => {
				console.log('aceee');
				done(null, e);
			});
	})
);

passport.serializeUser((User, done) => {
	done(null, User.id);
});

passport.deserializeUser((id, done) => {
	done(null, User);
});
