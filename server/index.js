const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const rutasTorneos = require('./rutas/torneos');
const rutasFechas = require('./rutas/fechas');
const rutasJugadores = require('./rutas/jugadores');
const rutasClubes = require('./rutas/clubes');
const rutasCiudades = require('./rutas/ciudades');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/torneos', rutasTorneos);
app.use('/api/fechas', rutasFechas);
app.use('/api/jugadores', rutasJugadores);
app.use('/api/clubes', rutasClubes);
app.use('/api/ciudades', rutasCiudades);

const puerto = process.env.PUERTO || 8080;

app.listen(puerto, () => {
  console.log(`Listening on puerto ${puerto}`);
});
