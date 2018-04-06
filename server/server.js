require('./config/config');
require('./db/mongo-connect');
const express = require('express');
const bodyParser = require('body-parser');
const { favoritesRouter } = require('./routes/favorites');
const { quotesRouter } = require('./routes/quotes');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use("/quotes",quotesRouter);
app.use("/favorites",favoritesRouter);








app.listen(port,() => console.log(`app listening on ${port}`));
