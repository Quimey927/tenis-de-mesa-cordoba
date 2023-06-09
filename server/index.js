import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

import rutasTorneos from './rutas/torneos.js';
import rutasFechas from './rutas/fechas.js';
import rutasJugadores from './rutas/jugadores.js';
import rutasClubes from './rutas/clubes.js';
import rutasCiudades from './rutas/ciudades.js';
import rutasCategoriasTorneos from './rutas/categoriasTorneos.js';
import rutasCategoriasFechas from './rutas/categoriasFechas.js';
import rutasStreams from './rutas/streams.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/torneos', rutasTorneos);
app.use('/api/fechas', rutasFechas);
app.use('/api/jugadores', rutasJugadores);
app.use('/api/clubes', rutasClubes);
app.use('/api/ciudades', rutasCiudades);
app.use('/api/categoriasTorneos', rutasCategoriasTorneos);
app.use('/api/categoriasFechas', rutasCategoriasFechas);
app.use('/api/streams', rutasStreams);

const puerto = process.env.PUERTO || 8080;

app.listen(puerto, () => {
  console.log(`App escuchando en puerto ${puerto}`);
});
