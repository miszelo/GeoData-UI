export type GeoData = {
  place: Types;
  timestamp: string;
  pm10: number;
  pm25: number;
  humidity: number;
  pressure: number;
  temperature: number;
};

export type Types = {
  name: string;
  city: string;
  street: string;
  postalCode: string;
  coordinates: Coordinates;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};
