const Place = require('../models/place');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mbxToken = process.env.MAPBOX_TOKEN;
const mbxGeocoder = mbxGeocoding({accessToken: mbxToken});
const {storage, cloudinary} = require('../cloudinary');


module.exports.index = async (req, res) => {

    const places = await Place.find({});
    res.render('places/index', {places})
}


module.exports.renderNewForm = (req, res) => {
    res.render('places/new');
}

module.exports.createNewForm = async (req, res, next) => {
    // if(!req.body.places) throw new ExpressError('Invalid Place Data', 400);
    const geoData =  await mbxGeocoder.forwardGeocode({
        query: req.body.places.location,
        limit: 1
    }).send()
    console.log(geoData.body.features[0].geometry)
    const place = new Place(req.body.places);
    place.geoLocation = geoData.body.features[0].geometry;
    console.log(place)
    place.image = req.files.map(f => ({url: f.path, filename: f.filename }));
    place.author = req.user._id;
    await place.save();
    
    req.flash('success', 'Thanks for your participation. You\'ve successfully added a place')
    res.redirect(`/places/${place._id}`);
}

module.exports.showPlace = async (req, res, next) => {
    const places = await Place.findById(req.params.id).populate({ 
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author')

    if (!places) {
        req.flash('error', 'Cannot find that Place!')
        res.redirect('/places');
    }
    res.render('places/show', {places});
}

module.exports.renderEditForm = async (req, res) => {
    const {id} = req.params;
    const places = await Place.findById(id)
    if (!places){
        req.flash('error', 'Cannot find that place');
        return res.redirect('/places');
    }
    res.render('places/edit', {places})
}

module.exports.editPlace = async (req, res) => {
    const {id} = req.params;
    
    const placeFound = await Place.findById(id);
    if (!placeFound) {
        req.flash('error', 'Cannot find that Place!')
        res.redirect('/places');
    }
    
    const place = await Place.findByIdAndUpdate(id, {...req.body.places})
    const allImages = req.files.map(f => ({url: f.path, filename: f.filename }));
    place.image.push(...allImages);
    await place.save();
    
    if (req.body.delImages){
        for (let filename of req.body.delImages){
            await cloudinary.uploader.destroy(filename)
        }
        await place.updateOne({$pull: {image: {filename: {$in: req.body.delImages}}}})
    }
    req.flash('success', 'Thanks for your participation. You\'ve successfully updated a place!')
    res.redirect(`/places/${place._id}`);
    
}

module.exports.destroyPlace = async (req, res) => {
    const {
        id
    } = req.params;
    await Place.findByIdAndDelete(id);
    req.flash('success', 'Your place has been removed!')
    res.redirect('/places');
}