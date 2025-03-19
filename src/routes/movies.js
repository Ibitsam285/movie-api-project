const express = require("express");
const { createMovie, getMovies, getMovieById, updateMovie, deleteMovie } = require("../controllers/movieController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createMovie);
router.get("/", authMiddleware, getMovies);
router.get("/:id", authMiddleware, getMovieById);
router.put("/:id", authMiddleware, updateMovie);
router.delete("/:id", authMiddleware, deleteMovie);

module.exports = router; 
