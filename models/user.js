const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'You must enter an email'],
        unique: true
    }
});   
//we use the passport tool to generate the other required field for us
//including some good functions too
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema)