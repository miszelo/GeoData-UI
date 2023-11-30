export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatDateToStringFull = (dateToFormat: Date) => {
    const date = new Date(dateToFormat);
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${
        date.getMinutes().toString().length <= 1
            ? "0" + date.getMinutes()
            : date.getMinutes()
    }`;
};

export const formatDateToStringOnlyTime = (dateToFormat: Date) => {
    const date = new Date(dateToFormat);
    return `${date.getHours()}:${
        date.getMinutes().toString().length <= 1
            ? "0" + date.getMinutes()
            : date.getMinutes()
    }`;
};

export const formatDateToStringOnlyDate = (dateToFormat: Date) => {
    const date = new Date(dateToFormat);
    return `${date.getFullYear()}` +
        `-${date.getMonth().toString().length <= 1 ? "0" + date.getMonth() : date.getMonth()}` +
        `-${date.getDate().toString().length <= 1 ? "0" + date.getDate() : date.getDate()}`;
};
