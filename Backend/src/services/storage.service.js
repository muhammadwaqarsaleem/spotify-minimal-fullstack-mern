const { ImageKit } = require("@imagekit/nodejs")

const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

async function uploadFile(file) {
    const fileName = `music_${Date.now()}.mp3`;

    const result = await ImageKitClient.files.upload({
        file,
        fileName,
        folder: "yt-complete-backend/music"
    })
    return result;
}

module.exports = { uploadFile }