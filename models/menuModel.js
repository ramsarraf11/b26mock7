const mongoose = require("mongoose")


const menuSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    hotelid: String
}, {
    versionKey: false
})


const MenuModel = new mongoose.model("menudata", menuSchema)

module.exports = { MenuModel }