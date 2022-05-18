const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const fileRoute = require('./routes/admin-routes/adminFile');
// const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    'useNewUrlParser': true
}
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const movieRouter = require('./routes/movie-admin-routes/movies');
const cartRouter = require('./routes/customer-routes/cart');

app.use('/movies', movieRouter);
app.use('/cart', cartRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
