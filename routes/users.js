const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const usersControllers = require('../controllers/users');


router.get('/register', usersControllers.renderRegisterForm)

router.post('/register', catchAsync(usersControllers.createUser))

router.get('/login', usersControllers.renderLoginForm)

router.post('/login', passport.authenticate('local', {failureFlash:true ,failureRedirect: '/login'}), usersControllers.login)

router.get('/logout', usersControllers.logout)



module.exports = router;