const mongoose = require("mongoose")


const restaurantSchema = mongoose.Schema({
    name: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    menu: []
}, {
    versionKey: false
})


const RestaurantModel = new mongoose.model("restaurantdata", restaurantSchema)

module.exports = { RestaurantModel }