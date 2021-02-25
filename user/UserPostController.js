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
router.post('/create-post', VerifyToken, async function (req, res) {
  let loggedUser = await User.findById(req.userId)
  if (loggedUser.activated == false) return res.status(400).send("User not activated")

  UserPost.create({
    user: loggedUser,
    text: req.body.text,
    date: Date.now()
  },
    async function (err, userpost) {
      if (err) return res.status(500).send("There was a problem adding the information to the database.");
      res.status(201).send(userpost);
    });
});


// RETURNS ALL POSTS FROM USERS THAT LOGGED IN USER FOLLOWS
router.get('/followed-posts', VerifyToken, async function (req, res) {
  let posts = [];
  let user = await User.findById(req.userId)
  if (!user) res.send("User unidentified")
  for (let userId of user.following) {
    let fposts = await UserPost.find({ user: userId })
    posts.push(fposts)
  }
  res.send(posts)
});

// RETURNS ALL POSTS FROM A SELECTED USER 
router.get('/:id', VerifyToken, async function (req, res) {
  let userp = await User.findById(req.params.id, (err, user) => {
    if (err) res.send("user not found")
  })
  let posts = await UserPost.find({ user: userp._id });
  res.send(posts)
})

module.exports = router;