import { GeoData } from "../types/types";
import { Icon } from "leaflet";

export const getIcon = (data: GeoData) => {
  return new Icon({
    iconUrl: getIconUrl(data),
    iconSize: [30, 30],
  });
};
const getIconUrl = (data: GeoData) => {
  return `/${
    data.pm25 < 13
      ? "perfect"
      : data.pm25 < 35
        ? "good"
        : data.pm25 < 55
          ? "ok"
          : data.pm25 < 75
            ? "bad"
            : "worst"
  }.png`;
};
