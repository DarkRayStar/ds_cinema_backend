const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    movieName: { type: String, required: true },
    producer: { type: String, required: true },
    year: { type: Number, required: true },
}, {
    timestamps: true,
});

const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;