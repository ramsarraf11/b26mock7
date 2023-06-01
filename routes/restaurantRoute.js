const { Router } = require("express")


const { RestaurantModel } = require("../models/restaurantModel")
const { MenuModel } = require("../models/menuModel")


const restro = Router()


restro.post("/addrestro", async (req, res) => {
    let { name } = req.body
    try {
        let data = await RestaurantModel.find({ name })
        if (data.length === 0) {
            let restrorant = new RestaurantModel(req.body)
            await restrorant.save()
            res.send("new restaurant added")
        } else {
            res.send("restaurant already exist")
        }
    } catch (error) {
        res.send(error)
    }
})

restro.get("/restaurants", async (req, res) => {
    let allData = await RestaurantModel.find({})
    try {
        res.status(200).send(allData)
    } catch (error) {
        res.send(error)
    }
})

restro.get("/restaurants/:id", async (req, res) => {
    let id = req.params.id
    let allData = await RestaurantModel.findOne({ _id: id })
    try {
        if (allData) {
            res.status(200).send(allData)
        } else {
            res.send("No restaurant available with this Id")
        }
    } catch (error) {
        res.send(error)
    }
})

restro.get("/restaurants/:id/menu", async (req, res) => {
    let id = req.params.id
    let allData = await RestaurantModel.findOne({ _id: id })
    try {
        if (allData) {
            res.status(200).send(allData.menu)
        } else {
            res.send("No restaurant menu available with this Id")
        }
    } catch (error) {
        res.send(error)
    }
})


restro.post("/api/restaurants/:id/menu", async (req, res) => {
    let id = req.params.id
    req.body.hotelid = id
    let { name, description, price } = req.body
    try {
        let data = await RestaurantModel.findOne({ _id: id })
        if (data) {
            let restrorant = new MenuModel({ name, description, price })
            await restrorant.save()
            let obj = await MenuModel.find({ hotelid: id })
            let pushobj = { menu: obj }
            await RestaurantModel.findByIdAndUpdate({ _id: id }, pushobj)
            res.send("new item added")
        } else {
            res.send("item already exist")
        }
    } catch (error) {
        res.send(error)
    }
})

restro.delete("/api/restaurants/:id/menu", async (req, res) => {
    let id = req.params.id
    try {
        let data = await RestaurantModel.find({})
        if (data) {

        } else {
            res.send("")
        }
    } catch (error) {
        res.send(error)
    }
})


module.exports = { restro }