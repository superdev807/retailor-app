const mongoose = require('mongoose');
const mongoosePagniate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const ApartmentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    floorAreaSize: {
        type: Number,
        required: true,
    },
    pricePerMonth: {
        type: Number,
        required: true,
    },
    numberOfRooms: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    associated_realtor: {
        type: Object,
        required: true,
    },
    available_state: {
        type: String,
        default: 'Available',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

ApartmentSchema.plugin(mongoosePagniate);
module.exports = User = mongoose.model('apartments', ApartmentSchema);
