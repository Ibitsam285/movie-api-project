const Actor = require("../models/Actor");

// Create a new actor
const createActor = async (req, res) => {
    try {
        const { name, age, country } = req.body;
        const newActor = new Actor({ name, age, country });
        await newActor.save();
        res.status(201).json(newActor);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });  // ✅ Handle missing required fields
        }
        res.status(400).json({ error: error.message });
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all actors
const getActors = async (req, res) => {
    try {
        const actors = await Actor.find();
        res.json(actors);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving actors", error });
    }
};

// Get an actor by ID
const getActorById = async (req, res) => {
    try {
        const actor = await Actor.findById(req.params.id);
        if (!actor) return res.status(404).json({ message: "Actor not found" });
        res.json(actor);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving actor", error });
    }
};

// Update an actor by ID
const updateActor = async (req, res) => {
    try {
        const updatedActor = await Actor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedActor) return res.status(404).json({ message: "Actor not found" });
        res.json(updatedActor);
    } catch (error) {
        res.status(500).json({ message: "Error updating actor", error });
    }
};

// Delete an actor by ID
const deleteActor = async (req, res) => {
    try {
        const deletedActor = await Actor.findByIdAndDelete(req.params.id);
        if (!deletedActor) return res.status(404).json({ message: "Actor not found" });
        res.json({ message: "Actor deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting actor", error });
    }
};

module.exports = { createActor, getActors, getActorById, updateActor, deleteActor };
