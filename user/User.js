let mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({
  name:
  {
    type: String,
    required: true
  },
  email:
  {
    type: String,
    required: true
  },
  password:
  {
    type: String
    , required: true
  },
  activated: { Boolean, default: false },
  activationCode: String,
  image: { type: String, default: 'default.png' },
  description: { type: String, default: "" },
  posts: Array,
  followers: Array,
  following: Array
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');