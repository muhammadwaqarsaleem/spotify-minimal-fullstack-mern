const mongoose = require('mongoose'); // package used to establish connect with DB/create one if needed

async function connectDB() {

    try {

        await mongoose.connect(process.env.MONGO_URI) // secret key to connect with/create DB
        console.log('Database connected successfully!');

    }

    catch (err) {
        console.log('Database connection error: ', err);
    }
}

module.exports = connectDB;