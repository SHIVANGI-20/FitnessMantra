const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const { Translate } = require('@google-cloud/translate').v2;

const app = express();

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

//method override middleware
app.use(methodOverride('_method'));

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

//Add idea form
app.get('/ideas/add', (req, res) => {
   res.render('ideas/add');
});

// Edit Idea Form
app.get('/ideas/edit/:id', (req, res) => {
   Idea.findOne({
      _id: req.params.id
   }).lean()
   .then(idea => {
      res.render('ideas/edit', {
         idea: idea
      });
   });
 });

//admin route
app.get('/admin/password/enpm613', (req, res) => {
   Idea.find({}).lean()
      .sort({date: 'desc'})
      .then(ideas => {
         res.render('admin/home', {
            ideas: ideas
         });
      })
});

//Process videos form
app.post('/ideas', (req, res) => {
   let errors = [];

   if (!req.body.title) {
      errors.push({ text: 'Please add a title' });
   }
   if (!req.body.details) {
      errors.push({ text: 'Please add some details' });
   }
   if (!req.body.url) {
      errors.push({ text: 'Please add an url' });
   }
   if (!req.body.type) {
      errors.push({ text: 'Please select a type' });
   }

   if (errors.length > 0) {
      res.render('ideas/add', {
         errors: errors,
         title: req.body.title,
         details: req.body.details,
         url: req.body.url,
         type: req.body.type,
      });
   } else {
      const newUser = {
         title: req.body.title,
         details: req.body.details,
         url: req.body.url,
         type: req.body.type,
      }
      new Idea(newUser)
         .save()
         .then(idea => {
            res.redirect('/');
         })
   }
});

//edit form process
app.put('/ideas/:id', (req, res) => {
   Idea.findOne({
      _id: req.params.id
   })
   .then(idea => {
      //new values
      idea.title = req.body.title,
      idea.details = req.body.details,
      idea.url = req.body.url,
      idea.type = req.body.type

      idea.save()
         .then(idea => {
            res.redirect('/admin/password/enpm613')
         })
   });
});

//Delete idea
app.delete('/ideas/:id', (req, res) => {
   Idea.remove({_id: req.params.id})
      .then(() => {
         res.redirect('/admin/password/enpm613');
      })
})

/**const port = process.env.PORT || 5000;

app.listen(port, () => {
   console.log(`Server started on port ${port}`)
}); **/

const host = '0.0.0.0';
const port = process.env.PORT || 3000;


app.listen(port, host, function () {
   console.log("Server started.......");
});
