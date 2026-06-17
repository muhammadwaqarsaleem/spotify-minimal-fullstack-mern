const express = require('express');
const musicController = require('../controllers/music.controller');
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router();

// POST req. goes to middleware first, if authorization successful and next() hit, then it goes on to actually creating music/album i.e. next param.
// Role based acces given to only artists:
router.post("/upload", authMiddleware.authArtist ,upload.single("music"), musicController.createMusic)
router.post("/album", authMiddleware.authArtist, musicController.createAlbum)

// Role based access given to only user accounts:
router.get("/", authMiddleware.authUser, musicController.getAllMusics)
router.get("/albums", authMiddleware.authUser, musicController.getAllAlbums)

router.get("/albums/:albumId", authMiddleware.authUser, musicController.getAlbumById)

module.exports = router;