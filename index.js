const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const { Translate } = require('@google-cloud/translate').v2;

const app = express();

//load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');


//Passport config
require('./config/passport')(passport);

//connect to mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Rohit:FitnessMantra@cluster0.2jkfx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
   useNewUrlParser: true
})
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));

//Load Video Model
require('./models/Idea');
const Idea = mongoose.model('ideas');


//Handlebars middleware
app.engine('handlebars', exphbs({
   defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static folder middleware
app.use(express.static(path.join(__dirname, 'public')));

//method override middleware
app.use(methodOverride('_method'));

//express-session middleware
app.use(session({
   secret: 'secret',
   resave: true,
   saveUninitialized: true,
 }));
 

//passport middleware( after express-session only)
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global variables
app.use(function(req, res, next){
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error = req.flash('error');
   res.locals.user = req.user || null;
   next();
});

//home page
app.get('/index', (req, res) => {
   res.render('index');
});

//Landing page
app.get('/', (req, res) => {
   res.render('landing');
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



//admin route
app.get('/admin/password/enpm613', (req, res) => {
   Idea.find({}).lean()
      .sort({ date: 'desc' })
      .then(ideas => {
         res.render('admin/home', {
            ideas: ideas
         });
      })
});






//use routes
app.use('/ideas', ideas);
app.use('/users', users);



/**const port = process.env.PORT || 5000;

app.listen(port, () => {
   console.log(`Server started on port ${port}`)
}); **/

const host = '0.0.0.0';
const port = process.env.PORT || 3000;


app.listen(port, host, function () {
   console.log("Server started.......");
});
