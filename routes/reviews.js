const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const { placeSchemas, reviewSchemas } = require('../schemas.js');

const {nextTick} = require('process');

const multer = require('multer');

const {isLoggedIn, isAuthorUser, isReviewUser, validatePlace, validateReview} = require('../middleware');

const Place = require('../models/place');
const Review = require('../models/review');

const ExpressError = require('../utils/ExpressError');
const {storage, cloudinary} = require('../cloudinary');
const upload = multer({storage});
const reviewsControllers = require('../controllers/reviews');



router.post('/', isLoggedIn, validateReview, catchAsync(reviewsControllers.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewUser ,catchAsync(reviewsControllers.destroyReview))


module.exports = router;