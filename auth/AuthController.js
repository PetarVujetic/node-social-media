let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let User = require('../user/User');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let crypto = require("crypto")
let config = require('../config');
let VerifyToken = require('./VerifyToken')
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
let cookieParser = require('cookie-parser')
router.use(cookieParser())
let sendActivationMail = require('./SendActivationMail')
let cacheTime;

router.post('/register', async function (req, res) {
  if (cacheTime && cacheTime > Date.now() - 10 * 1000) return res.send("Wait a moment before registering again")
  let hashedPassword = bcrypt.hashSync(req.body.password, 8);
  let matchedEmail = await User.findOne({ email: req.body.email })
  if (matchedEmail) return res.status(401).send("Email is already registered to an account!")
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  },
    async function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      let activationCode = crypto.createHash("sha256").update(JSON.stringify(user._id + "odecnoitavitca")).digest("hex");
      user.activationCode = activationCode
      await user.save()
      sendActivationMail(user).catch(console.error);
      cacheTime = Date.now()
      res.send(user)
    });

});

router.get('/me', VerifyToken, function (req, res, next) {
  User.findById(req.userId,
    { password: 0 }, // projection
    function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");

      res.status(200).send(user);

    });
});


router.post('/login', function (req, res) {

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    let token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.cookie('auth', token);
    res.status(200).send({ auth: true, token: token });
  });

});

router.get('/logout', function (req, res) {
  res.clearCookie("auth");
  res.status(200).send({ auth: false, token: null });

});

router.get('/:activationCode', VerifyToken, function (req, res) {

  User.findById(req.userId,
    async function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("User is not logged in.");
      if (user.activated) res.send('User is already activated!')
      user.activated = true
      await user.save()
      res.status(200).send("User successfully activated!");
    });
});


module.exports = router;