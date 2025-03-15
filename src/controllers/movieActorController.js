const MovieActor = require("../models/MovieActor");

// Link an actor to a movie
const linkActorToMovie = async (req, res) => {
    try {
        const { movie_id, actor_id } = req.body;

        if (!movie_id || !actor_id) {
            return res.status(400).json({ error: "MovieActor validation failed" });
        }
        
        const newMovieActor = new MovieActor({ movie_id, actor_id });
        await newMovieActor.save();
        res.status(201).json(newMovieActor);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: "MovieActor validation failed" });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all movie-actor links
const getMovieActors = async (req, res) => {
    try {
        const movieActors = await MovieActor.find();
        res.json(movieActors);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving movie-actor links", error });
    }
};

// Get a movie-actor link by ID
const getMovieActorById = async (req, res) => {
    try {
        const movieActor = await MovieActor.findById(req.params.id);
        if (!movieActor) return res.status(404).json({ message: "Link not found" });
        res.json(movieActor);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving movie-actor link", error });
    }
};

// Remove an actor from a movie
const unlinkActorFromMovie = async (req, res) => {
    try {
        await MovieActor.findByIdAndDelete(req.params.id);
        res.json({ message: "Actor removed from movie" });
    } catch (error) {
        res.status(500).json({ message: "Error unlinking actor from movie", error });
    }
};

module.exports = { linkActorToMovie, getMovieActors, getMovieActorById, unlinkActorFromMovie };
