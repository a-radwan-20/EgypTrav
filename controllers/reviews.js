const Review = require('../models/review');
const Place = require('../models/place');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mbxToken = process.env.MAPBOX_TOKEN;
const mbxGeocoder = mbxGeocoding({accessToken: mbxToken});




module.exports.createReview = async (req, res) => {
    const place = await Place.findById(req.params.id)
    const review = new Review(req.body.reviews);
    review.author = req.user._id;
    place.reviews.push(review);
    await review.save();
    await place.save();
    req.flash('success', 'Thanks for your participation and your feedback!')
    res.redirect(`/places/${place._id}`);
}

module.exports.destroyReview = async (req, res) => {
    const {id,reviewId} = req.params;
    await Place.findByIdAndUpdate(id, {$pull: {reviews: reviewId} });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Your feedback has been removed!!')
    res.redirect(`/places/${id}`);
}