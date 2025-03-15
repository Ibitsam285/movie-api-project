const express = require("express");
const { linkActorToMovie, getMovieActors, getMovieActorById, unlinkActorFromMovie } = require("../controllers/movieActorController");

const router = express.Router();

router.post("/", linkActorToMovie);
router.get("/", getMovieActors);
router.get("/:id", getMovieActorById);
router.delete("/:id", unlinkActorFromMovie);

module.exports = router;
