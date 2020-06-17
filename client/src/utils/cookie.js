export const setCookie = (name, value, domain, maxAge = 30, path = '/') => {
    const maxAgeInSecs = 24 * 60 * 60 * maxAge;
    const domainAttribute = domain ? `;domain=${domain}` : '';
    document.cookie = `${name}=${value}${domainAttribute};Max-Age=${maxAgeInSecs};path=${path}`;
};

export const getCookie = (cname) => {
    const name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    const numCookies = cookies.length;
    for (let i = 0; i < numCookies; i++) {
        let c = cookies[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }

    return '';
};

export const deleteCookie = (cname, path) => {
    if (getCookie(cname)) {
        const pathString = path ? `;path=${path}` : '';
        document.cookie = `${cname}= ;expires = Thu, 01 Jan 1970 00:00:01 GMT${pathString}`;
    }
};
