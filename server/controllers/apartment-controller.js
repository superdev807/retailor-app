const Apartment = require('../models/Aparment');

exports.createApartment = (req, res) => {
    const newApartment = new Apartment(req.body);
    newApartment
        .save()
        .then((apartment) => res.json(apartment))
        .catch((err) => console.log(err));
};

exports.readApartments = (req, res) => {
    console.log(req.body);
    const pageNum = parseInt(req.body.pageNum) || 1;
    const pageLimit = parseInt(req.body.pageLimit) || 5;
    Apartment.paginate({}, { page: pageNum, limit: pageLimit })
        .then((result) => {
            return res.json(result);
        })
        .catch((err) => console.log(err));
};

exports.updateApartment = (req, res) => {};

exports.deleteApartment = (req, res) => {
    console.log(req.body);
    Apartment.findOneAndDelete({ _id: req.body.id })
        .then(() => {
            return res.json({ message: 'Apartment Deleted Successfully' });
        })
        .catch((err) => console.log(err));
};
