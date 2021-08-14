const User = require('../models/user');
const passport = require('passport');



module.exports.renderRegisterForm = (req, res) => {
    res.render('auth/register')
}

module.exports.createUser = async (req, res, next) => {
    try {
        const {username, password, email} = req.body;
        const newUser = new User({username, email});
        const regUser = await User.register(newUser, password);
        req.login(regUser, err => {
        if(err) return next(err);
        req.flash('success',`Welcome ${username}`);
        res.redirect('/places')
    })
    } catch (e){
        req.flash('error', e.message);
        res.redirect('register');
    } 
}

module.exports.renderLoginForm = (req, res) => {
    res.render('auth/login')
}

module.exports.login = (req, res) => {
    req.flash('success', `Welcome back ${req.body.username} !`);
    const redirectUrl = req.session.returnTo || '/places';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('error', `You have been logged out`)
    res.redirect('/places');
}