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

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
server.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});
