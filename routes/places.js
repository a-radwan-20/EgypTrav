const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { placeSchemas, reviewSchemas } = require('../schemas');
const multer = require('multer');
const {isLoggedIn, isAuthorUser, isReviewUser, validatePlace, validateReview} = require('../middleware');
const Place = require('../models/place');
const ExpressError = require('../utils/ExpressError');
const {storage, cloudinary} = require('../cloudinary');
const upload = multer({storage});
const placesControllers = require('../controllers/places');



router.get('/', catchAsync(placesControllers.index))

router.get('/new', isLoggedIn, placesControllers.renderNewForm)

router.post('/', isLoggedIn,  upload.array('image'), validatePlace, catchAsync(placesControllers.createNewForm))

router.get('/:id', catchAsync(placesControllers.showPlace))

router.get('/:id/edit', isLoggedIn, isAuthorUser, catchAsync(placesControllers.renderEditForm))

router.put('/:id',  isLoggedIn, isAuthorUser, upload.array('image'), validatePlace, catchAsync(placesControllers.editPlace));

router.delete('/:id', isLoggedIn, isAuthorUser, catchAsync(placesControllers.destroyPlace))


module.exports = router;