import { ChartContent } from "./ChartStyles";

import { GeoData } from "../../types/types";
import { FC } from "react";

type props = {
  isLoading: boolean;
  error: Error | null;
  data: GeoData[];
};

export const Chart: FC<props> = ({ isLoading, error, data }) => {
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <ChartContent>
      <a>siema</a>
    </ChartContent>
  );
};
