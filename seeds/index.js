const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // Your user ID
            author: '61c7bbfa74350b4d4067ee61',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.Fuga, deleniti adipisci cum neque tempore quam! Exercitationem magnam sint labore dolor perspiciatis! Alias veritatis accusamus necessitatibus animi, debitis commodi adipisci dolorum.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dkqecmozt/image/upload/v1640334685/YelpCamp/hozyuypuafufb04cqxri.jpg',
                    filename: 'YelpCamp/hozyuypuafufb04cqxri'
                },
                {
                    url: 'https://res.cloudinary.com/dkqecmozt/image/upload/v1640334690/YelpCamp/qdlaihefugqspbt5ukri.jpg',
                    filename: 'YelpCamp/qdlaihefugqspbt5ukri'
                }
            ]
        })
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close()
})
