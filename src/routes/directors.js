const express = require("express");
const { createDirector, getDirectors, getDirectorById, updateDirector, deleteDirector } = require("../controllers/directorController");

const router = express.Router();

router.post("/", createDirector);
router.get("/", getDirectors);
router.get("/:id", getDirectorById);
router.put("/:id", updateDirector);
router.delete("/:id", deleteDirector);

module.exports = router;
