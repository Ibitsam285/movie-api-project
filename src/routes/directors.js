const express = require("express");
const { createDirector, getDirectors, getDirectorById, updateDirector, deleteDirector } = require("../controllers/directorController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createDirector);
router.get("/", authMiddleware, getDirectors);
router.get("/:id", authMiddleware, getDirectorById);
router.put("/:id", authMiddleware, updateDirector);
router.delete("/:id", authMiddleware, deleteDirector);

module.exports = router;
