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
    },
    role: {
        presence: { allowEmpty: false, message: 'is required' },
    },
};
