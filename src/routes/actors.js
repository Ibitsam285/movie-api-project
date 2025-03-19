const express = require("express");
const { createActor, getActors, getActorById, updateActor, deleteActor } = require("../controllers/actorController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createActor);
router.get("/", authMiddleware, getActors);
router.get("/:id", authMiddleware, getActorById);
router.put("/:id", authMiddleware, updateActor);
router.delete("/:id", authMiddleware, deleteActor);

module.exports = router;
