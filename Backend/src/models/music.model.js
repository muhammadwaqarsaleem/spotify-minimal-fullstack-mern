const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    uri: { // Like an ID
        type: String, 
        required: true,
    },
    title: {
        type: String,
        required: true,
    }, 
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // acts like a FK i.e. its FK taken as PK of user collection
        required: "true",
    }
})

const musicModel = mongoose.model("music", musicSchema)

module.exports = musicModel;