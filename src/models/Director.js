const mongoose = require("mongoose");

const DirectorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  birth_year: { type: Number, required: true },
});

module.exports = mongoose.model("Director", DirectorSchema);
