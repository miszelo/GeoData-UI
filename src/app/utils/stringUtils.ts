export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatDate = (dateToFormat: Date) => {
  const date = new Date(dateToFormat);
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${
    date.getMinutes().toString().length <= 1
      ? "0" + date.getMinutes()
      : date.getMinutes()
  }`;
};
