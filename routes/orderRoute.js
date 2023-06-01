const { Router } = require("express")

const { UserModel } = require("../models/userModel")
const { OrderModel } = require("../models/orderModel")
const { RestaurantModel } = require("../models/restaurantModel")
const { authorization } = require("../middlewares/authorization")


const order = Router()

order.use(authorization)

order.post("/orders", async (req, res) => {
    let {restroid} = req.body
    let userid = req.body
    try {
        let user = await UserModel.findOne({ _id: userid })
        let restrent = await RestaurantModel.find({ _id: restroid })
        let address = user.address
        let menu = restrent.menu
        let status = "placed"
        let cost = 0;
        for (let i = 0; i < menu.length; i++) {
            cost += menu[i].price
        }
        let myObj = {
            user: user,
            restaurant: restrent,
            items: menu,
            totalPrice: cost,
            deliveryAddress: address,
            status: status
        }

        let order = new OrderModel(myObj)
        await order.save()
        res.send({ "message": "Order Placed" })
    } catch (error) {
        res.send(user)
    }
})

order.get("/orders/:id", async (req, res) => {
    let id = req.params.id
    try {
        let data = await OrderModel.findOne({ _id: id })
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

order.patch("/orders/:id", async (req, res) => {
    let id = req.params.id
    let data = req.body
    try {
        await OrderModel.findByIdAndUpdate({ _id: id }, { data })
        res.send("data got updated")
    } catch (error) {
        res.send(error)
    }
})

module.exports = { order }