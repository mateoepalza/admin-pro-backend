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

// Base de datos
dbConnection();



// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: "Hola mundo"
    })
});


app.listen( process.env.PORT /**accesing the environment variables */, () => {
    console.log("Servidor corriendo en puerto " + process.env.PORT);
} )