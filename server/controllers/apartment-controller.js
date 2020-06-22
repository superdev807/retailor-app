const Apartment = require('../models/Aparment');
const Aparment = require('../models/Aparment');

exports.createApartment = (req, res) => {
    const newApartment = new Apartment(req.body);
    newApartment
        .save()
        .then((apartment) => res.json(apartment))
        .catch((err) => {
            console.log(err);
            return res.status(500).send({ message: err.message || 'Error occurred while creating the apartment.' });
        });
};

exports.readApartments = (req, res) => {
    const pageNum = parseInt(req.body.pageNum) || 1;
    const pageLimit = parseInt(req.body.pageLimit) || 5;
    Apartment.paginate({}, { page: pageNum, limit: pageLimit })
        .then((result) => {
            return res.json(result);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send({ message: err.message || 'Error occurred while reading the apartments.' });
        });
};

exports.updateApartment = (req, res) => {
    if (!req.params.id) {
        console.log('400 response');
        return res.status(400).send({
            message: 'Invalid Request',
        });
    }
    Aparment.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((apartment) => {
            if (!apartment) {
                return res.status(404).send({
                    message: 'Not found with id ' + req.params.id,
                });
            }
            res.send(apartment);
        })
        .catch((err) => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Not found with id ' + req.params.id,
                });
            }
            return res.status(500).send({
                message: 'Error updating apartment with id ' + req.params.id,
            });
        });
};

exports.deleteApartment = (req, res) => {
    if (!req.params.id) {
        console.log('400 response');
        return res.status(400).send({
            message: 'Invalid Request',
        });
    }
    Apartment.findByIdAndRemove(req.params.id)
        .then(() => {
            return res.json({ message: 'Apartment Deleted Successfully' });
        })
        .catch((err) => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Not found with id ' + req.params.id,
                });
            }
            return res.status(500).send({
                message: 'Error deleting apartment with id ' + req.params.id,
            });
        });
};
