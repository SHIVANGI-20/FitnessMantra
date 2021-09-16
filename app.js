const express = require('express');
const mongoose = require('mongoose');

const app = express();

//home page
app.get('/', (req, res) => {
   res.send('FitnessMantra');
});

//about route
app.get('/about', (req, res) => {
   res.send('FitnessMantra about page');
});

const port = process.env.port || 5000;

app.listen(port, () => {
   console.log(`Server started on port ${port}`)
});