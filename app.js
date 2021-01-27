let express = require('express');
let exphbs = require('express-handlebars');
let dotenv = require("dotenv")

//Config and variable setup
dotenv.config({ path: './config/.env' })
PORT = process.env.PORT || 3000;
let app = express();

//Middlewares
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Routes
app.get('/', function (req, res) {
  res.send("HI")
});

app.listen(PORT, () => {
  console.log(`The server is running on PORT:${PORT}`);
});