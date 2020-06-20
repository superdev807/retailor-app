exports.isValidToken = (expiresUnixTimestamp) => {
    return new Date(new Date()) - new Date(expiresUnixTimestamp * 1000) < 0;
};
