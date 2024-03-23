export const formatDiscordTimestamp = (timestamp) => {
    const matches = timestamp.match(/<t:(\d+):(\w)>/);
    if (!matches) return '';

    const unixTimestamp = parseInt(matches[1], 10) * 1000;
    const formatType = matches[2];
    const date = new Date(unixTimestamp);

    switch (formatType) {
        case 't': // Short Time
            return formatDate(date, 'time');
        case 'T': // Long Time
            return formatDate(date, 'time-seconds');
        case 'd': // Short Date
            return formatDate(date, 'date');
        case 'D': // Long Date
            return formatDate(date, 'date-long');
        case 'f': // Short Date/Time
            return `${formatDate(date, 'date')} ${formatDate(date, 'time')}`;
        case 'F': // Long Date/Time
            return `${formatDate(date, 'date-long')} ${formatDate(date, 'time-seconds')}`;
        case 'R': // Relative Time
            return getRelativeTimeDescription(date);
        default:
            return '';
    }
};

export const formatDate = (date, formatType) => {
    const optionsMap = {
        'time': { hour: '2-digit', minute: '2-digit', hour12: false },
        'time-seconds': { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false },
        'date': { year: 'numeric', month: '2-digit', day: '2-digit' },
        'date-long': { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' },
    };
    return new Intl.DateTimeFormat('en-US', optionsMap[formatType]).format(date);
};

const getRelativeTimeDescription = (date) => {
    const now = new Date();
    const diffInSeconds = Math.round((date - now) / 1000);

    const isPast = diffInSeconds < 0;
    const absDiffInSeconds = Math.abs(diffInSeconds);

    if (absDiffInSeconds < 60) {
        return isPast ? `${absDiffInSeconds} second${absDiffInSeconds === 1 ? '' : 's'} ago` : `in ${absDiffInSeconds} second${absDiffInSeconds === 1 ? '' : 's'}`;
    } 
    else if (absDiffInSeconds < 3600) {
        const minutes = Math.floor(absDiffInSeconds / 60);
        return isPast ? `${minutes} minute${minutes === 1 ? '' : 's'} ago` : `in ${minutes} minute${minutes === 1 ? '' : 's'}`;
    } 
    else if (absDiffInSeconds < 86400) {
        const hours = Math.floor(absDiffInSeconds / 3600);
        return isPast ? `${hours} hour${hours === 1 ? '' : 's'} ago` : `in ${hours} hour${hours === 1 ? '' : 's'}`;
    } 
    else if (absDiffInSeconds < 2592000) {
        const days = Math.floor(absDiffInSeconds / 86400);
        return isPast ? `${days} day${days === 1 ? '' : 's'} ago` : `in ${days} day${days === 1 ? '' : 's'}`;
    }
    else if (absDiffInSeconds < 31536000) {
        const months = Math.floor(absDiffInSeconds / 2592000);
        return isPast ? `${months} month${months === 1 ? '' : 's'} ago` : `in ${months} month${months === 1 ? '' : 's'}`;
    }
    else {
        const years = Math.floor(absDiffInSeconds / 31536000);
        return isPast ? `${years} year${years === 1 ? '' : 's'} ago` : `in ${years} year${years === 1 ? '' : 's'}`;
    }
};
