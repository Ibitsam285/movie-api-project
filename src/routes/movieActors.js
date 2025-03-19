const express = require("express");
const { linkActorToMovie, getMovieActors, getMovieActorById, unlinkActorFromMovie } = require("../controllers/movieActorController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, linkActorToMovie);
router.get("/", authMiddleware, getMovieActors);
router.get("/:id", authMiddleware, getMovieActorById);
router.delete("/:id", authMiddleware, unlinkActorFromMovie);

module.exports = router;
