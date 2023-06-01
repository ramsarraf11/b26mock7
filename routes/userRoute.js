const { Router } = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

const { UserModel } = require("../models/userModel")
const {authorization} = require("../middlewares/authorization")

const user = Router()


user.post("/register", async (req, res) => {
    try {
        let { name, email, password, address } = req.body
        let checkData = UserModel.find({ email })
        if (checkData.length > 0) {
            res.send("User Already Present. Please Login")
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(201).send(err)
                } else {
                    let details = ({ name, email, password: hash, address })
                    let data = new UserModel(details)
                    await data.save()
                    res.send(`user registration success ${data}`)
                }
            });
        }
    } catch (error) {
        console.log(error)
    }
})

user.post("/login", async (req, res) => {
    let { email, password } = req.body
    try {
        let user = await UserModel.find({ email })
        let hashPass = user[0].password
        if (user.length > 0) {
            bcrypt.compare(password, hashPass, (err, result) => {
                if (result) {
                    let token = jwt.sign({ id: user[0]._id }, "masai", { expiresIn: "1h" })
                    res.send({ message: "login success", "token": token })
                } else {
                    res.send("Invalid Password")
                }
            });
        } else {
            res.send("User Not Found")
        }
    } catch (error) {
        res.send(error)
    }
})

user.use(authorization)

user.put("/user/:id/reset", async (req, res) => {
    let id = req.params.id
    let { password, newpassword } = req.body
    try {
        let user = await UserModel.find({ _id: id })
        if (user.length > 0) {
            let hashPass = user[0].password
            bcrypt.compare(password, hashPass, (err, result) => {
                if (result) {
                    bcrypt.hash(newpassword, 5, async (err, hash) => {
                        if (err) {
                            res.status(201).send(err)
                        } else {
                            let details = ({ newpassword: hash })
                            UserModel.findByIdAndUpdate({ _id: id }, details)
                            res.send(`user new password updated`)
                        }
                    });
                } else {
                    res.send("check your Password")
                }
            });
        } else {
            res.send("old password incorrect")
        }
    } catch (error) {

    }
})

module.exports = { user }