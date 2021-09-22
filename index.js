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

/**const port = process.env.PORT || 5000;

app.listen(port, () => {
   console.log(`Server started on port ${port}`)
}); **/

const host = 'localhost';
const port = 3000;

const host = '0.0.0.0';
const port = process.env.PORT || 3000;


app.listen(port, host, function() {
   console.log("Server started.......");
 });
