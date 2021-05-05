require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
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
app.use('/app', express.static('public'));

//Conexion con el enrutado "dir routes"
routes(app);

app.listen(3000);
console.log('Server is ready');
