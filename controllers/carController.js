const Car = require('../models/Car');

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { getAllCars };
