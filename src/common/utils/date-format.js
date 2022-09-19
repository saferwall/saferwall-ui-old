import moment from "moment";

export const DATE_FORMAT = "MMMM Do YYYY hh:mm";

export function timestampToDate(timestamp) {
    if (timestamp === 0 || timestamp == null) {
        return '';
    }

    return moment(timestamp * 1000).format(DATE_FORMAT);
}

/**
 * Get Time ago 
 * 
 * @param {object|string} dateParam 
 * @returns {string}
 */
export function timeAgo(dateParam) {
    if (!dateParam) {
        return null;
    }

    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();


    if (seconds < 5) {
        return 'now';
    }
    if (seconds < 60) {
        return `${seconds} seconds ago`;
    }
    if (seconds < 90) {
        return 'about a minute ago';
    }
    if (minutes < 60) {
        return `${minutes} minutes ago`;
    }
    if (isToday) {
        return 'Today'
    }
    if (isYesterday) {
        return 'Yesterday'
    }
    return today.getFullYear();
}

/**
 * Get time ago 
 * Return only one of : (year||month||day||hour||minute||second)
 * 
 * @param {Number|String} dateParam 
 * @returns {string}
 */
export function timeAgoCounts(dateParam) {
    const time = typeof dateParam === 'number' ? dateParam : Date.parse(dateParam);

    let seconds = Math.floor((Date.now() - time * 1000) / 1000);

    let intervals = { 'year': 31536000, 'month': 2592000, 'day': 86400, 'hour': 3600, 'minute': 60, 'second': 1 };
    let interval = 0;

    let intkey = Object.keys(intervals).find(_key => {
        interval = seconds / intervals[_key];
        return interval > 1;
    });

    let fi = Math.floor(interval);
    return `${fi} ${intkey}${fi === 1 ? '' : 's'}`;
}