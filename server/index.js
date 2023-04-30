const express = require('express');
const app = express();
const cors = require('cors');

const eventRoutes = require('./routes/events');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/eventos', eventRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
