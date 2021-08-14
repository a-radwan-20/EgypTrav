
const mongoose = require('mongoose');
const cities = require('./cities');
const Place = require('../models/place');
//const {descriptors, locations} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/place', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('Database connected')
})
//to pick a random element within any array
//const sample = array => array[Math.floor(Math.random() * array.length)];

    const seedDB = async () => {
        try{
        await Place.deleteMany({});
        // for (let i = 0; i < locations.length; i++){
            
        //     const place = new Place({
               
        //         location : `${locations[i].location}`,
        //         name: `${locations[i].name}`,
        //         description: `${locations[i].description}`,
        //         price: locations[i].price,
        //         author: '610fd20ba497c8b8abc923b7'
        // })
        //     await place.save();
        // }

        } catch (err){
            console.log(err.message)
        }
    }
    

seedDB().then(() => {
    mongoose.connection.close();
})

// const seedDB = async () => {
//     await Place.deleteMany({});
//     for (let i = 0; i < cities.length; i++){
//         const random79 = Math.floor(Math.random() * 79);
//         const price = Math.floor(Math.random() * 30) + 10;

//         const place = new Place({
//             location : `${cities[random79].city}, ${cities[random79].admin_name}`,
//             name: `${sample( locations)}`,
//             image: 'https://source.unsplash.com/collection/11622798',
//             description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita accusamus saepe quidem animi amet dignissimos est autem cupiditate, doloribus nesciunt ipsa quod ratione aperiam cum sapiente rerum totam sint? Quasi?',
//             price
//         })
//         await place.save();
//     }
// }