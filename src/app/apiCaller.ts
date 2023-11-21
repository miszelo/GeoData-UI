import { Register, useQuery, UseQueryResult } from "@tanstack/react-query";
import { GeoData } from "./types/types";
import { formatDate } from "./utils/dateUtils";

export const fetchData = (): UseQueryResult<
  GeoData[],
  Register extends { defaultError: infer TError } ? TError : Error
> => {
  return useQuery({
    queryKey: ["currentData"],
    queryFn: async () =>
      await fetch("http://localhost:8080/api/v1/smog-data").then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      }),
  });
};

export const fetchDataBy = (
  key: "city" | "school",
  value: string,
  queryKey: [string, Date],
  date: string = formatDate(),
): UseQueryResult<
  GeoData[],
  Register extends { defaultError: infer TError } ? TError : Error
> => {
  return useQuery({
    queryKey: queryKey,
    queryFn: async () =>
      await fetch(
        `http://localhost:8080/api/v1/smog-data/${key}/${value}?date=${date}`,
      ).then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      }),
  });
};
