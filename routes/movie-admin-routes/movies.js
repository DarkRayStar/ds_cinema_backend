const router = require('express').Router();
let Movie = require('../../models/movie-admin-models/movies.model');

router.route('/').get((req, res) => {
    Movie.find()
        .then(movies => res.json(movies))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const movieName = req.body.movieName;
    const producer = req.body.producer;
    const year = req.body.year;
    const Description = req.body.Description;
    const imageurl = req.body.imageurl;
    const genre = req.body.genre;
    const imdb = req.body.imdb;
    const showtime = req.body.showtime;
    const cast = req.body.cast;

    const newMovie = new Movie({
        movieName,
        producer,
        year,
        Description,
        imageurl,
        genre,
        imdb,
        showtime,
        cast
    });

    newMovie.save()
        .then(() => res.json('Movie added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Movie.findById(req.params.id)
        .then(movie => res.json(movie))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(() => res.json('Movie deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Movie.findById(req.params.id)
        .then(movie => {
            movie.movieName = req.body.movieName;
            movie.producer = req.body.producer;
            movie.year = req.body.year;
            movie.Description = req.body.Description;
            movie.imageurl = req.body.imageurl;
            movie.genre = req.body.genre;
            movie.imdb = req.body.imdb;
            movie.showtime = req.body.showtime;
            movie.cast = req.body.cast;

            movie.save()
                .then(() => res.json('Movie updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;