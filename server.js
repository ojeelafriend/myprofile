require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const app = express();
const routes = require('./routes/network');

//Conexion a la base de datos nosql
mongoose.connect('mongodb://localhost/myprofile-db', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
//Configuraciones básicas de json, urlcode, motor de plantillas y definicion de statico
app.set('view engine', 'ejs');
app.use(express.json(), express.urlencoded({ extended: false }));

//Configuracion passport y sesiones
app.use(cookie('top secret'));
app.use(
	session({
		secret: 'top secret',
		resave: true,
		saveUninitialized: true,
	})
);
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

//Conexion con el enrutado "dir routes"
routes(app);

app.listen(3000, () => {
	console.log('Server is ready');
});
