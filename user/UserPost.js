let mongoose = require('mongoose');
let UserPostSchema = new mongoose.Schema({
  text: String,
  image: String,
  user: String,
  date: Date
});
mongoose.model('UserPost', UserPostSchema);

module.exports = mongoose.model('UserPost');