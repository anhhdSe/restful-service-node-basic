const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

router.get('/', async (req, res) => {
  const customer = await Customer.find().sort('name');
  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res.status(404).send('The genre with given ID was not found!');

  res.send(customer);
});

router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });

  customer = await customer.save();
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { error } = validateCustomer(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {
      new: true,
    }
  );

  if (!customer)
    return res.status(404).send('The genre with given ID was not found');

  res.send(customer);
  sssss;
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer)
    return res.status(404).send('The genre with given ID was not found');

  res.send(customer);
});

const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  });

  return schema.validate(customer);
};

module.exports = router;
