const Director = require("../models/Director");

// Create a new director
const createDirector =  async (req, res) => {
    try {
        const { name, country, birth_year } = req.body;
        const newDirector = new Director({ name, country, birth_year });
        await newDirector.save();
        res.status(201).json(newDirector);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });  // ✅ Return 400 for validation errors
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Get all directors
const getDirectors = async (req, res) => {
    try {
        const directors = await Director.find();
        res.json(directors);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving directors", error });
    }
};

// Get a director by ID
const getDirectorById = async (req, res) => {
    try {
        const director = await Director.findById(req.params.id);
        if (!director) return res.status(404).json({ message: "Director not found" });
        res.json(director);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving director", error });
    }
};

// Update a director by ID
const updateDirector = async (req, res) => {
    try {
        const updatedDirector = await Director.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDirector) return res.status(404).json({ message: "Director not found" });
        res.json(updatedDirector);
    } catch (error) {
        res.status(500).json({ message: "Error updating director", error });
    }
};

// Delete a director by ID
const deleteDirector = async (req, res) => {
    try {
        const deletedDirector = await Director.findByIdAndDelete(req.params.id);
        if (!deletedDirector) return res.status(404).json({ message: "Director not found" });
        res.json({ message: "Director deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting director", error });
    }
};

module.exports = { createDirector, getDirectors, getDirectorById, updateDirector, deleteDirector };
