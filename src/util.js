export const getUsername = () => {
    let user = '';
    if (/\?user=(.+)&?/.test(window.location.search)) {
        user = window.location.search.match(/\?user=(.+)&?/)[1];
    }
    return user;
};

export const days2Now = created_at => {
    const now = +new Date();
    const last = +new Date(created_at);
    return Math.floor((now - last) / (1000 * 60 * 60 * 24));
};

export const dealTime = created_at => {
    return new Date(created_at)
        .toLocaleString()
        .match(/(.*)\s/)[0]
        .replace(/\//g, '-');
};

export const set = (key, value) => {
    localStorage.setItem(
        key,
        typeof value === 'object' ? JSON.stringify(value) : value
    );
};

export const get = key => {
    return localStorage.getItem(key);
};

export const is2019 = created_at => {
    const time = +new Date(created_at);
    const startTime = 1546272000000; // Tue Jan 01 2019 00:00:00 GMT+0800
    const endTime = 1577808000000; // Tue Jan 01 2020 00:00:00 GMT+0800
    if (time > startTime && time < endTime) {
        return true;
    }

    return false;
};
