const CookieManager = {
    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}`;
    },
    getCookie(name) {
        const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
        return matches ? decodeURIComponent(matches[1]) : null;
    },
    deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    }
};

window.CookieManager = CookieManager;