// we are loading the environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// deconstruct the object that we export
const { dbConnection } = require('./database/config');


// crear el servidor de expres
const app = express();

// Configure cors (middleware)
app.use(cors())

// lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));


app.listen( process.env.PORT /**accesing the environment variables */, () => {
    console.log("Servidor corriendo en puerto " + process.env.PORT);
} )