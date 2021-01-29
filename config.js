let dotenv = require("dotenv")
dotenv.config({ path: '.env' })
module.exports = {
  'secret': process.env.jwt_secret
};