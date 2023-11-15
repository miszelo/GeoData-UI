export type GeoData = {
  place: Place;
  timestamp: Date;
  pm10: number;
  pm25: number;
  humidity: number;
  pressure: number;
  temperature: number;
};

export type Place = {
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
