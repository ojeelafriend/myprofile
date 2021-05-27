const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const controller = require('../components/users/controller');

passport.use(
	new LocalStrategy((username, password, done) => {
		if (!username || !password) {
			return done(null, false);
		}

		controller
			.auth(username, password)
			.then((User) => {
				done(null, User);
			})
			.catch((e) => {
				done(null, e);
			});
	})
);

//PUEDE QUE ESTO LO ESTÉ MANDANDO NULO, DEBIDO A QUE EL JSON USER ESTÁ DENTRO DE LOCAL...
//... Y ES UNA DEVOLUCIÓN "RESOLVE" DEL CONTROLADOR.
passport.serializeUser((User, done) => {
	done(null, User.id);
});

passport.deserializeUser((id, done) => {
	done(null, User);
});
