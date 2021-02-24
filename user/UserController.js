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

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) return res.status(500).send("There was a problem deleting the user.");
    res.status(200).send("User: " + user.name + " was deleted.");
  });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
    if (err) return res.status(500).send("There was a problem updating the user.");
    res.status(200).send(user);
  });
});

module.exports = router;