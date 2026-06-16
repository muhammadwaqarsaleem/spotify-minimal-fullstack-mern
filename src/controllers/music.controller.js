const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");

async function createMusic(req, res) {
  const token = req.cookies.token; // retieve token from user browser

  if (!token) {
    // means no token with user. No login done
    return res
      .status(401)
      .json({ message: "Unauthorized Access. Please log in!!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "artist") {
      return res
        .status(403)
        .json({ message: "You don`t have access to create music!" });
    }

    // taking data from the user (frontend)
    const { title } = req.body;
    const file = req.file;

    // storing file upload data retrieved from image kit
    const result = await uploadFile(file.buffer.toString("base64"));

    // creating music entry/row/record in the DB
    const music = await musicModel.create({
      uri: result.url, // retrieving url against the image stored in imagekit storage
      title,
      artist: decoded.id,
    });

    res.status(201).json({
      message: "Music Created Successfully!",
      music: {
        id: music._id,
        uri: music.uri,
        title: music.title,
        artist: music.artist,
      },
    });
  } catch (err) {
    console.log(err);

    return res.status(401).json({ message: "Unauthorized!" });
  }
}

async function createAlbum(req, res) {
  const token = req.cookies.token; // retieve token from user browser

  if (!token) {
    // means no token with user. No login done
    return res
      .status(401)
      .json({ message: "Unauthorized Access. Please log in!!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "artist") {
      return res
        .status(403)
        .json({ message: "You don`t have access to create music!" });
    }

    // taking data from the user (frontend)
    const { title, musics } = req.body;

    // creating music entry/row/record in the DB
    const album = await albumModel.create({
      title: title,
      artist: decoded.id,
      musics: musics,
    });

    res.status(201).json({
      message: "Album Created Successfully!",
      album: {
        id: album._id,
        title: album.title,
        artist: album.artist,
        musics: album.musics,
      },
    });
  } catch (err) {
    console.log(err);

    return res.status(401).json({ message: "Unauthorized!" });
  }
}

module.exports = { createMusic, createAlbum };
