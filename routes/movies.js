const express = require('express');
const { Movie, validate } = require('../models/movies');
const { Genre } = require('../models/genres');
const router = express.Router();

router.get('/', async (req, res) => {
  const movie = await Movie.find().sort('name');
  res.send(movie);
});

router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie)
      return res.status(404).send('The genre with given ID was not found!');

    res.send(movie);
  } catch (error) {
    console.log(error);
    res.status(400).send('Something failed!');
  }
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send('Invalid genre!');

    let movie = new Movie({
      title: req.body.title,
      // Do not put all the genre above in here
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });

    movie.save();
    res.send(movie);
  } catch (error) {
    console.log(error);
    res.status(400).send('Something went wrong!');
  }
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send('Invalid genre!');

    let movie = await Movie.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });

    movie.save();
    res.send(movie);
  } catch (error) {
    console.log(error);
    res.status(400).send('Something went wrong!');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie)
      return res.status(404).send('The movie with given id not found');

    res.send(movie);
  } catch (error) {
    console.log(error);
    res.status(400).send('Something went wrong!');
  }
});

module.exports = router;
