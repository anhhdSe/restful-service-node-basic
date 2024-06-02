const mongoose = require('mongoose');
const express = require('express');
// const app = express() // This will not work when you separate  the route in separated module

// instead of working with app object, we working with router object
const router = express.Router();

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' },
];

const validateGenres = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
};

router.get('/', (req, res) => {
  res.send(genres);
});

router.get('/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with given ID was not found!');
  res.send(genre);
});

router.post('/', (req, res) => {
  const { error } = validateGenres(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

router.put('/:id', (req, res) => {
  const { error } = validateGenres(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with given ID was not found');

  genre.name = req.body.name;

  res.send(genre);
});

router.delete('/:id', (req, res) => {
  const { error } = validateGenres(req.body);
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with given ID was not found');
  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

// Basically we get the route object on the top. Then we add route to it and then export
module.exports = router;
