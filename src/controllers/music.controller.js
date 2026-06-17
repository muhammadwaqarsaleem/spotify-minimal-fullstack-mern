const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");

async function createMusic(req, res) {
  // taking data from the user (frontend)
  const { title } = req.body;
  const file = req.file;

  // storing file upload data retrieved from image kit
  const result = await uploadFile(file.buffer.toString("base64"));

  // creating music entry/row/record in the DB
  const music = await musicModel.create({
    uri: result.url, // retrieving url against the image stored in imagekit storage
    title,
    artist: req.user.id,
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
}

async function createAlbum(req, res) {
  // taking data from the user (frontend)
  const { title, musics } = req.body;

  // creating music entry/row/record in the DB
  const album = await albumModel.create({
    title: title,
    artist: req.user.id,
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
}

async function getAllMusics(req, res) {

    const musics = await musicModel
    .find() // .skip(1) will skip the n first musics
    .limit(10) // at a time only fetch 2 musics
    .populate("artist", "userName email")
    // retrieved all entries/rows from musicModel which has musics
    // if we do .find().populate("artist") then based on artist var which holds Obj. id (PK), it will display all info of artist as well that is stored in user collection
    // if .find().populate("artist", "username email") then only username and email fetched out

    res.status(200).json({
        message: "All Musics Fetched Successfully!",
        musics: musics,
    })
}

async function getAllAlbums(req, res) {

    const albums = await albumModel.find().select("title artist").populate("artist", "userName email") // retrieved all entries/rows from albumModel which has albums
    // if we do .find().populate("artist") then based on artist var which holds Obj. id (PK), it will display all info of artist as well that is stored in user collection
    // if .find().populate("artist", "userName email") then only username and email fetched out
    // .select ensures that from all entries of album table, only title and artist shown. Optimization strategy so that on album page, less data needs to be loaded

    res.status(200).json({
        message: "All Albums Fetched Successfully!",
        albums: albums,
    })
}

async function getAlbumById(req, res) {

  const albumId = req.params.albumId;

  const album = await albumModel
    .findById(albumId)
    .populate("artist", "userName email")
    .populate({
      path: 'musics',
      populate: { path: 'artist', select: 'userName email' }
    });

  res.status(200).json({
    message: "Album Fetched Successfully!",
    album: album,
  })
}

module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById };
