const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    active_home: true,
    title: 'Friend Chat',
    description: 'Friend App',
  });
});

router.get('/about', (req, res, next) => {
  res.render('about', {
    active_about: true,
    title: 'About Us',
    description: 'This is a group chat app using express mongodb and socket.io',
  });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Login' });
});

router.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'Signup' });
});


module.exports = router;
