const express = require('express');
const app = express();
const cors = require('cors');

const tournamentRoutes = require('./routes/tournaments');
const roundRoutes = require('./routes/rounds');
const playerRoutes = require('./routes/players');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/tournaments', tournamentRoutes);
app.use('/api/rounds', roundRoutes);
app.use('/api/players', playerRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
