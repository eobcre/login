const express = require('express');
const router = express.Router();
// const app = express();
const cors = require('cors');

const { body, validationResult } = require('express-validator');
const pool = require('../db');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
require('dotenv').config();
const config = require('../config');

// cors
router.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

router.use(express.json());

// auth check middleware
const authCheck = (req, res, next) => {
  try {
    const token = req.headers.token;
    const decoded = JWT.verify(token, config.JWT.secret);
    console.log(decoded);
    next();
  } catch (err) {
    return res.status(401).json({
      msg: 'AUTH FAILED',
    });
  }
};

// auth
router.get('/', (req, res) => {
  res.send('Hello, Auth');
});

router.get('/allUsers', (req, res) => {
  pool.query('SELECT * FROM login', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// auth check
router.get('/test', authCheck, (req, res) => {
  res.status(200).json({
    msg: 'AUTH SUCCESS',
  });
});

// sign up
router.post(
  '/sign-up',
  // validation check
  // body('username').isLength(),
  // body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    // get user input username
    const username = req.body.username;
    // get user input password
    const password = req.body.password;
    console.log(username, password);
    // const email = req.body.email;

    const errors = validationResult(req);
    // if errors not empty
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check if user exist in db
    pool.query(
      'SELECT * FROM login WHERE username = $1',
      [username],
      (error, results) => {
        if (error) {
          throw error;
        }

        // console.log('Query results:', results.rows);

        if (results.rows.length > 0) {
          res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        } else {
          // convert to hash
          bcrypt.hash(password, 10, (hashError, hashedPassword) => {
            if (hashError) {
              throw hashError;
            }

            console.log('Hashed Password:', hashedPassword);

            // save to db
            pool.query(
              'INSERT INTO login(username, passhash) VALUES($1, $2)',
              [username, hashedPassword],
              (insertError, insertResult) => {
                if (insertError) {
                  throw insertError;
                }

                // JWT token
                const token = JWT.sign(
                  { username },
                  config.JWT.secret,
                  config.JWT.options
                );

                const body = {
                  username: req.body.username,
                  token: token,
                };

                res.status(200).json({ msg: 'Sign up done', data: body });
              }
            );
          });
        }
      }
    );
  }
);

module.exports = router;
