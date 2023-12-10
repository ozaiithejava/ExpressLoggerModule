// index.js

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const logRequest = require('./fileLogger');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(logRequest('json')); // Özel logger modülünü kullanarak JSON formatında logla
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', (req, res) => {
  const { name } = req.body;
  res.render('result', { name });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
