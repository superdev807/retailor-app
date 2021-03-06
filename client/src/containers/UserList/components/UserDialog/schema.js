export const schema = {
    firstName: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    lastName: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    email: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            minimum: 6,
            maximum: 30,
        },
    },
};
