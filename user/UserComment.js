let mongoose = require('mongoose');
let UserCommentSchema = new mongoose.Schema({
  text: String,
  userPost: mongoose.ObjectId,
  user: mongoose.ObjectId,
  date: Date,
  likes: Array, 
});
mongoose.model('UserComment', UserCommentSchema);

module.exports = mongoose.model('UserCommentSchema');