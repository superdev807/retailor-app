const Apartment = require('../models/Aparment');

exports.createApartment = (req, res) => {
    const newApartment = new Apartment(req.body);
    newApartment
        .save()
        .then((apartment) => res.json(apartment))
        .catch((err) => console.log(err));
};

exports.readApartments = (req, res) => {};

exports.updateApartment = (req, res) => {};

exports.deleteApartment = (req, res) => {};
