let mongoose = require('mongoose');
let UserPostSchema = new mongoose.Schema({
  text: String,
  image: String,
  user: mongoose.ObjectId,
  date: Date,
  likes: Array,
  comments: Array 
});
mongoose.model('UserPost', UserPostSchema);

module.exports = mongoose.model('UserPost');