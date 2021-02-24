let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let UserPost = require('./UserPost');
let VerifyToken = require('../auth/VerifyToken')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
let User = require('./User');
let cookieParser = require('cookie-parser')
router.use(cookieParser())

// CREATES A POST FOR THE USER
router.post('/create-post', VerifyToken, function (req, res) {
  let loggedUser = User.findOne({ _id: req.userId })
  if (!loggedUser.activated) return res.status(400).send("User not activated")

  UserPost.create({
    user: req.userId,
    text: req.body.text
  },
    async function (err, userpost) {
      if (err) return res.status(500).send("There was a problem adding the information to the database.");
      loggedUser.post.push(userpost)
      await loggedUser.save()
      res.status(200).send(userpost);
    });
});

module.exports = router;