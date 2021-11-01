const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { route } = require('./ideas');
const router = express.Router();

//Load User Model
require('../models/User');
const User = mongoose.model('users');

//User login route
router.get('/login', (req, res) => {
   res.render('users/login');
});

//User Register route
router.get('/register', (req, res) => {
   res.render('users/register');
});

//login for POST
router.post('/login', (req, res, next) => {
   passport.authenticate('local', {
      successRedirect: '/index',
      failureRedirect: '/users/login',
      failureFlash: true
   })(req, res, next);
});

//register form POST
router.post('/register', (req, res) => {
   let errors = [];

   if (req.body.password !== req.body.password2) {
      errors.push({ text: 'Passwords do not match' });
   }

   if (req.body.password.length < 4) {
      errors.push({ text: 'Passwords must be atleast 4 characters' });
   }

   if (errors.length > 0) {
      res.render('users/register', {
         errors: errors,
         name: req.body.name,
         email: req.body.email,
         type: req.body.type,
         password: req.body.password,
         password2: req.body.password2
      });
   } else {
      User.findOne({ email: req.body.email })
         .then(user => {
            if (user) {
               //req.flash('error_msg', 'Email already registered');
               res.redirect('/users/login');
            } else {
               const newUser = new User({
                  name: req.body.name,
                  email: req.body.email,
                  type: req.body.type,
                  password: req.body.password
               });

               bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                     if (err) throw err;
                     newUser.password = hash;
                     newUser.save()
                        .then(user => {
                           console.log(user.type);
                           res.redirect('/users/login')
                        })
                        .catch(err => {
                           console.log(err);
                           return;
                        })
                  });
               });
            }
         });
   }
});

//Logout
router.get('/logout', (req, res) => {
   req.logout();
   req.flash('success_msg', 'You are logged out');
   res.redirect('/');
})


module.exports = router;