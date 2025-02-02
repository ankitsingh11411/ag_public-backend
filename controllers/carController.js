const Car = require('../models/Car');

const getAllCars = async (req, res) => {
  try {
    let { brand, minPower, maxPower, sort, page, limit } = req.query;

    let query = {};

    if (brand) {
      query.brand = new RegExp(brand, 'i');
    }

    if (minPower || maxPower) {
      query.power = {};
      if (minPower) query.power.$gte = parseInt(minPower);
      if (maxPower) query.power.$lte = parseInt(maxPower);
    }

    let sortOptions = {};
    if (sort) {
      const sortFields = sort.split(',');
      sortFields.forEach((field) => {
        if (field.startsWith('-')) {
          sortOptions[field.substring(1)] = -1;
        } else {
          sortOptions[field] = 1;
        }
      });
    }

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    const cars = await Car.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const totalCars = await Car.countDocuments(query);

    res.json({
      totalCars,
      page,
      limit,
      totalPages: Math.ceil(totalCars / limit),
      data: cars,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { getAllCars };
