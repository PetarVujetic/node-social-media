let dotenv = require("dotenv")
let mongoose = require('mongoose');
dotenv.config({ path: '.env' })
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, console.log("Connected to the db."));