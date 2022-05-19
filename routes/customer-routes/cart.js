const router = require('express').Router();
let Cart = require('../../models/customer-models/movie-cart.model');

router.route('/').get((req, res) => {
    Cart.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const movieName = req.body.movieName;
    const producer = req.body.producer;
    const year = req.body.year;
    const imageurl = req.body.imageurl;
    const genre = req.body.genre;
    const imdb = req.body.imdb;
    const theaterOpt = req.body.theaterOpt;
    const quantity = req.body.quantity;

    const newCart = new Cart({
        movieName,
        producer,
        year,
        imageurl,
        genre,
        imdb,
        theaterOpt,
        quantity
    });

    newCart.save()
        .then(() => res.json('Movie added to the cart!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Cart.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Cart.findByIdAndDelete(req.params.id)
        .then(() => res.json('Movie deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Cart.findById(req.params.id)
        .then(item => {
            item.movieName = req.body.movieName;
            item.producer = req.body.producer;
            item.year = req.body.year;
            item.imageurl = req.body.imageurl;
            item.genre = req.body.genre;
            item.imdb = req.body.imdb;
            item.theaterOpt = req.body.theaterOpt;
            item.quantity = req.body.quantity;

            item.save()
                .then(() => res.json('Movie updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;