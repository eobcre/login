const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const auth = require('./routes/auth');
require('dotenv').config();

// set to use json
app.use(express.json());
// set to use auth
app.use('/auth', auth);

// middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// browser
app.get('/', (req, res) => {
  res.send("Hey, it's working.");
});

// server console
app.listen(PORT, () => {
  console.log('server is running in PORT 3000');
});
