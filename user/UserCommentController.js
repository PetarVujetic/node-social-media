let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let UserPost = require('./UserPost');
let VerifyToken = require('../auth/VerifyToken')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
let User = require('./User');
let UserPostComment = require('./UserComment')
let cookieParser = require('cookie-parser')
router.use(cookieParser())

router.post('/create-comment', VerifyToken, async function (req, req){
    let userPost = await UserPost.findById(req.body.postId)


    UserPostComment.create({
        text: req.body.text,
        user: req.userId,
        userPost: req.body.postId,
        date: Date.now()
    },
    async function (err, comment) {
        if(err) res.send(err)
        userPost.comments.push(comment._id)
        await userPost.save()
        res.send(comment)
    })
})


module.exports = router;