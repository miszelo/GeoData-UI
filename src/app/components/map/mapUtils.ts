import { GeoData } from "../../types/types";

export const getIconUrl = (data: GeoData) => {
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
