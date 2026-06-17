const mongoose = require('mongoose'); // to use this package to create album table schema in db

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    musics: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "music", // use music table as FK
    }],
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
})

const albumModel = mongoose.model("album", albumSchema)

module.exports = albumModel;