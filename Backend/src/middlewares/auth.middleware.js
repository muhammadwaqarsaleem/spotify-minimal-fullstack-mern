const jwt = require('jsonwebtoken');

// middlewares have 3 parameters always
async function authArtist(req, res, next) {

    const token = req.cookies.token; // check if user logged in/token preset in browser

    if (!token) {
        return res.status(401).json({ message: "Unauthorized. Please log in to your account!!" })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "Unfortunately, you don`t have access to create a music! Please create an artist account." })
        }

        // modifying req. object
        req.user = decoded; // stores decoded objects in a new var. in req obj. called user which can now be accessed ahead

        next() // allows the post api call to move to next argument
    }
    catch (err) {
        console.log(err);

        return res.status(401).json({ message: "Unauthorized!" })
    }
}

// 2nd auth rule to authenticate if any account logged in or not:
async function authUser(req, res, next) {
    const token = req.cookies.token; // check if user logged in/token preset in browser

    if (!token) {
        return res.status(401).json({ message: "Unauthorized. Please log in to your account!!" })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "user") {
            return res.status(403).json({ message: "Unfortunately, you don`t have access to all musics. Please log in to user account." })
        }

        req.user = decoded; // add a new user var to req. object and store decoded object in that var.

        next()
    }

    catch (err) {
        console.log(err);

        res.status(401).json({ message: "Unauthorized" })
    }
}

module.exports = { authArtist, authUser }