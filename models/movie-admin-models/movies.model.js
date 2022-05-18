const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    movieName: { type: String, required: true },
    producer: { type: String, required: true },
    year: { type: String, required: true },
    Description: { type: String, required: true },
    imageurl: { type: String, required: true },
    genre: { type: String, required: true },
    imdb: { type: String, required: true },
}, {
    timestamps: true,
});

const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;