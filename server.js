const express = require('express');

const app = express();
app.use(express.json());

const routes = require('./src/routes');

Object.keys(routes).forEach((route) => {
  app.use('/', routes[route]);
})

let port = 80

app.listen(port, () => {
  console.log(`http://127.0.0.1: ${port}`)
})