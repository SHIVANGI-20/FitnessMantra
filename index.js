const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

//connect to mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/fitnessmantra-dev', {
   useNewUrlParser: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

//Load todo Model
require('./models/Todo');
const Todo = mongoose.model('todo');


//Handlebars middleware
app.engine('handlebars', exphbs({
   defaultLayout: 'main'
 }));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//home page
app.get('/', (req, res) => {
   res.render('index');
});

//about route
app.get('/about', (req, res) => {
   res.render('about');
});

//Boydbuilding route
app.get('/bodybuilding', (req, res) => {
   res.render('bodybuilding');
});

//Meditation route
app.get('/meditation', (req, res) => {
   res.render('meditation');
});

//yoga route
app.get('/yoga', (req, res) => {
   res.render('yoga');
});

//Add todo form
app.get('/todo/add', (req, res) => {
   res.render('todo/add');
});

//Process todo form
app.post('/todo', (req, res) => {
   let errors = [];

   if(!req.body.title) {
      errors.push({text: 'Please add a title'});
   } 
   if(!req.body.details) {
      errors.push({text: 'Please add some details'});
   } 

   if(errors.length > 0) {
      res.render('todo/add', {
         errors: errors,
         title: req.body.title,
         details: req.body.details
      });
   } else {
      res.send('passed');
   }
});

/**const port = process.env.PORT || 5000;

app.listen(port, () => {
   console.log(`Server started on port ${port}`)
}); **/

const host = '0.0.0.0';
const port = process.env.PORT || 3000;


app.listen(port, host, function() {
   console.log("Server started.......");
 });
