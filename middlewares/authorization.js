const jwt = require("jsonwebtoken")

async function authorization(req, res, next) {
    req.body.userid = "nice"
    try {
        const token = req.headers.authorization
        if (token) {
            const decoded = jwt.verify(token, "masai")
            if (decoded) {
                const userid = decoded.userid
                req.body.userid = userid
                next()
            } else {
                res.send("Please check your details")
            }
        } else {
            res.send("Please Login")
        }
    } catch (error) {
        res.send(error)
    }
}

module.exports = { authorization } 