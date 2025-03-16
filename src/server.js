const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// Import route files
const movieRoutes = require("./routes/movies");
const directorRoutes = require("./routes/directors");
const genreRoutes = require("./routes/genres");
const actorRoutes = require("./routes/actors");
const movieActorRoutes = require("./routes/movieActors");

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/directors", directorRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/actors", actorRoutes);
app.use("/api/movieActors", movieActorRoutes);

module.exports = app;  // Export app for testing
