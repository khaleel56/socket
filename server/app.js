const express = require('express');
const cors = require('cors');

require('./utils/database');
const router = require('./router')
const socket = require('./utils/socket');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json())
app.use('/uploads', express.static('uploads')); 
app.use("/app", router)

const httpServer = app.listen(PORT, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("Port is listening on:", PORT); // eslint-disable-line no-console
  }

});
socket.init(httpServer);
module.exports = app;
