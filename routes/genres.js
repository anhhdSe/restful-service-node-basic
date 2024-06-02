const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const { Genre, validate } = require('../models/genres');
// const app = express() // This will not work when you separate  the route in separated module

// instead of working with app object, we working with router object
const router = express.Router();

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send('The genre with given ID was not found!');

  res.send(genre);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // better to use let here instead of const
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // Using update first approach

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {
      new: true,
    }
  );

  if (!genre)
    return res.status(404).send('The genre with given ID was not found');

  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre)
    return res.status(404).send('The genre with given ID was not found');

  res.send(genre);
});

// Basically we get the route object on the top. Then we add route to it and then export
module.exports = router;
