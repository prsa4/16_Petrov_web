const CookieManager = {
    // Устанавливает cookie с заданным именем, значением и сроком хранения (в днях)
    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Вычисляет дату истечения
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}`; // Записывает cookie
    },

    // Получает значение cookie по имени
    getCookie(name) {
        const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`)); // Ищет cookie с указанным именем
        return matches ? decodeURIComponent(matches[1]) : null; // Декодирует и возвращает значение
    },

    // Удаляет cookie, устанавливая его срок действия в прошлое
    deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`; // Устанавливает устаревшую дату
    }
};

// Добавляет объект в глобальную область видимости
window.CookieManager = CookieManager;