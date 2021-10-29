const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create video schema
const IdeaSchema = new Schema({
   title:{
      type: String,
      required: true
   },
   details:{
      type: String,
      required: true
   },
   url: {
      type: String,
      required: true
   },
   type: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   }
});

mongoose.model('ideas', IdeaSchema);