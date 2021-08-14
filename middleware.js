const User = require('./models/user')
const Place = require('./models/place')
const Review = require('./models/review')
const { placeSchemas, reviewSchemas } = require('./schemas');

module.exports.isLoggedIn = (req, res, next) => {
    // console.log('Req. User: ', req.user)
    if (!req.isAuthenticated()){
        //req.session.returnTo = req.orginalUrl
        req.flash('error', 'You must be signed in')
        return res.redirect('/login');
    }
    
    next();
}

module.exports.isAuthorUser = async (req, res, next) => {
    const {id} = req.params;
    const placeFound = await Place.findById(id);
    console.log(placeFound, req.user._id);
    if (!placeFound.author.equals(req.user._id)){
        req.flash('error', 'You\'re not the author. You dont have permission!');
        return res.redirect(`/places/${id}`);
    }
    next();
}

module.exports.isReviewUser = async (req, res, next) => {
    const {id, reviewId} = req.params;
    const review = await Review.findById(reviewId);
    
    if (!review.author.equals(req.user._id)){
        req.flash('error', 'You\'re not the author. You dont have permission!');
        return res.redirect(`/places/${id}`);
    }
    next();
}


module.exports.validatePlace = (req, res, next) => {

    const {
        error
    } = placeSchemas.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}


module.exports.validateReview = (req, res, next) => {
    const {
        error
    } = reviewSchemas.validate(req.body)

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}