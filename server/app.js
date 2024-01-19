const express = require("express");
const authRoutes = require("./routes/authRoutes");
const roleRoutes = require('./routes/roleRoutes');
const bookRoutes = require('./routes/bookRoutes');
var cors = require('cors')
const authenticateUser = require("./middleWare/authMiddleWare");
const app = express();
app.use(express.json());

var corsOptions = {
    origin: 'http://localhost:3000'
  }

app.use(cors(corsOptions))

app.use('/auth', authRoutes);
app.use(authenticateUser);
app.use('/roles', roleRoutes)
app.use('/book', bookRoutes)

module.exports = app;
