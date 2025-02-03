
const mongoose = require("mongoose");

const { Schema } = mongoose;

const RestaurantSchema = new Schema({
    address: {
        building: String,
        street: String,
        zipcode: String,
    },
    city: String,
    cuisine: String,
    name: String,
    restaurant_id: Number
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;