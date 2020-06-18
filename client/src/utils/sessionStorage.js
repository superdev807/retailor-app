export const setKeyValToSessionStorage = (key, val) => {
    if (window.sessionStorage) {
        window.sessionStorage.setItem(key, val);
    }
};

export const getValFromSessionStorage = (key) => {
    return window.sessionStorage && window.sessionStorage.getItem(key);
};

export const removeFromSessionStorage = (key) => {
    window.sessionStorage && window.sessionStorage.removeItem(key);
};
