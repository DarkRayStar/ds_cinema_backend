const { boolean } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieCartSchema = new Schema({
    movieName: { type: String, required: true },
    producer: { type: String, required: true },
    year: { type: String, required: true },
    imageurl: { type: String, required: true },
    genre: { type: String, required: true },
    imdb: { type: String, required: true },
    theaterOpt: { type: String },
    quantity: { type: String },
    userId: { type: String },
    showOnCart: { type: Boolean },
    paidStatus: { type: Boolean },

}, {
    timestamps: true,
});

const MovieCart = mongoose.model('movieCart', movieCartSchema);

module.exports = MovieCart;