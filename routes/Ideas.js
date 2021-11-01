const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//Load Video Model
require('../models/Idea');
const Idea = mongoose.model('ideas');

//Add idea form
router.get('/add', (req, res) => {
   res.render('ideas/add');
});

// Edit Idea Form
router.get('/edit/:id', (req, res) => {
   Idea.findOne({
      _id: req.params.id
   }).lean()
   .then(idea => {
      res.render('ideas/edit', {
         idea: idea
      });
   });
 });

 //Process videos form
 router.post('/', (req, res) => {
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
            req.flash('success_msg', 'Video Submission Added')
            res.redirect('/');
         })
   }
});

//edit form process
router.put('/:id', (req, res) => {
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
            req.flash('success_msg', 'Video Submission Edited')
            res.redirect('/admin/password/enpm613')
         })
   });
});

//Delete idea
router.delete('/:id', (req, res) => {
   Idea.remove({_id: req.params.id})
      .then(() => {
         req.flash('success_msg', 'Video Submission removed')
         res.redirect('/admin/password/enpm613');
      })
})

module.exports = router;