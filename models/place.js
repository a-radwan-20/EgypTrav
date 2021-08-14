const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

const PlaceSchema = new Schema({
    name: String,
    image: [
        {
            url: String,
            filename: String
        }
    ],
    geoLocation: {
        type:    {
            type: String,
            enum: ['Point'],
            required: false,
        },
        coordinates: {
            type: [Number],
            required: false
        }
    },
    price: Number,
    description: String,
    location: String,
    author: 
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts)


PlaceSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/places/${this._id}">${this.name}</a><strong>
    <p>${this.description.substring(0, 20)}...</p>`
});


PlaceSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Place', PlaceSchema);
