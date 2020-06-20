export const schema = {
    name: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    description: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    floorAreaSize: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    pricePerMonth: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    numberOfRooms: {
        presence: { allowEmpty: false, message: 'is required' },
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
