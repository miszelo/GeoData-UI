export const filterRepeatedDates = (value: any, index: any, self: any) => {
  return self.indexOf(value) === index;
};

export const dataTypes = [
  {
    label: "Temperatura",
    value: "temperature",
  },
  {
    label: "Wilgotność",
    value: "humidity",
  },
  {
    label: "PM10",
    value: "pm10",
  },
  {
    label: "PM25",
    value: "pm25",
  },
  {
    label: "Ciśnienie",
    value: "pressure",
  },
];
