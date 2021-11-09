//////////////////// S T A R T   S E T U P   E X P R E S S ////////////////////
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//////////////////// E N D   S E T U P   E X P R E S S ////////////////////

const port = process.env.PORT || 5052;

const cors = require("cors");
app.use(cors());

require("dotenv").config();

//////////////////// S T A R T   S E T U P   R O U T I N G ////////////////////
const userController = require("./routes/userController")
app.use(userController)
//////////////////// E N D   S E T U P   R O U T I N G ////////////////////

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
