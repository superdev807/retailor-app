export const schema = {
    name: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    description: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    floorAreaSize: {
        presence: { allowEmpty: false, message: 'is required' },
        numericality: {
            greaterThan: 0,
            lessThanOrEqualTo: 100000,
            message: 'should be in the range: [0, 100000]',
        },
    },
    pricePerMonth: {
        presence: { allowEmpty: false, message: 'is required' },
        numericality: {
            greaterThan: 0,
            lessThanOrEqualTo: 100000,
            message: 'should be in the range: [0, 100000]',
        },
    },
    numberOfRooms: {
        presence: { allowEmpty: false, message: 'is required' },
        numericality: {
            greaterThan: 0,
            lessThanOrEqualTo: 200,
            message: 'should be in the range: [0, 200]',
        },
    },
};

export const addressSchema = {
    address: {
        presence: { allowEmpty: false, message: 'is required' },
    },
};

export const geoCodeSchema = {
    latitude: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    longitude: {
        presence: { allowEmpty: false, message: 'is required' },
    },
};
