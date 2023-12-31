// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
// const session=require("express-session");
const session = require('express-session');
var sessions=session({
  secret:"BACD",
  resave:false,
  saveUninitialized: false
})



const app = express();
const port = 3000;
app.use(sessions)

app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);

app.listen(port,"192.168.4.203", () => {
  console.log(`Server is running on port ${port}`);
});
