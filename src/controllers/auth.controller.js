const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // for password hashing i.e. store hash in db

async function registerUser(req, res) {
    const { userName, email, password, role= "user" } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [ // takes multiple objects as conditions and one by one checks if any user
            { userName }, // even has a match with any one of these and then returns it
            { email }
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({ message: "User Already Exists!!" })
    }

    // 10 is the salt that adds more/extra uniqueness to our hash making it even more difficult and time-taking to crack using brute-force
    const hash = await bcrypt.hash(password, 10) // asynchronous process, so make sure you add await, so that it is done before we proceed

    const user = await userModel.create({ // create an entry in the DB
        userName,
        email,
        password: hash,
        role
    })

    const token = jwt.sign({ // creating the token.
        id: user._id, // Note: Only one unqiue user entry required which is user._id. That alone is enough as well
        role: user.role,
    }, process.env.JWT_SECRET)

    res.cookie("token", token) // storing user token in his/her browser cookie

    res.status(201).json({
        message: "User Registered Successfully!",
        user: {
            id: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role,

        }
    })
}

async function loginUser(req, res) {
    const { userName, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [ // returns any user with either of these as valid credentials else returns empty obj.
            { userName },
            { email }
        ]
    })

    if (!user) {
        return res.status(401).json({ message: "Invalid Credentials!!" })
    }
 
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid Credentials" })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role, // role given in token so that later it can be retrieved and used for role based access
    }, process.env.JWT_SECRET)

    res.cookie("token", token) // storing user token in his/her browser cookie

    res.status(200).json({ 
        message: "User Logged In successfully!",
        user: {
            id: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role,
        }
    })
}

async function logoutUser(req, res) {
    res.clearCookie("token") // Just clear user cookie from the server
    res.status(200).json({ message: "User logged out successfully!" })
}

module.exports = { registerUser, loginUser, logoutUser }