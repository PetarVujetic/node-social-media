let mongoose = require('mongoose');
let UserStatusSchema = new mongoose.Schema({
  user:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  text:
  {
    type: String,
    required: true
  }
});
mongoose.model('UserStatus', UserStatusSchema);

module.exports = mongoose.model('UserStatus');