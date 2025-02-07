const Joi = require('joi');
const { mongoose } = require('mongoose');
const { genreSchema } = require('./genres');

const Movie = mongoose.model(
  'Movies',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      trim: true,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
  })
);

const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(5).required(),
    //Client only need to send the Id of genre not send full
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
  });

  return schema.validate(movie);
};

exports.Movie = Movie;
exports.validate = validateMovie;
