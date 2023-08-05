const express = require('express');
const hbs = require('hbs');
require('dotenv').config;

const app = express();
const port = process.env.PORT;

// Servir contenido estatico
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home', { title: 'Test Node' });
});

app.get('/generic', (req, res) => {
  res.sendFile(`${__dirname}/public/generic.html`);
});

app.get('/elements', (req, res) => {
  res.sendFile(`${__dirname}/public/elements.html`);
});

app.get('*', (req, res) => {
  // Dirname es la ruta absoluta donde esta ubicada la app
  res.sendFile(`${__dirname}/public/404.html`);
});

app.listen(port, () => {
  console.log('LISTENING');
});
