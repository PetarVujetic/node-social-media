let mongoose = require('mongoose');
let UserPostSchema = new mongoose.Schema({
  description: String,
  image: String,
  user: String,
  date: Date
});
mongoose.model('UserPost', UserPostSchema);

module.exports = mongoose.model('UserPost');