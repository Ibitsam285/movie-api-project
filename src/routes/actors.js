const express = require("express");
const { createActor, getActors, getActorById, updateActor, deleteActor } = require("../controllers/actorController");

const router = express.Router();

router.post("/", createActor);
router.get("/", getActors);
router.get("/:id", getActorById);
router.put("/:id", updateActor);
router.delete("/:id", deleteActor);

module.exports = router;
