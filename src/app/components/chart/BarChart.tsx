import { Chart } from "./ChartStyles";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { GeoData } from "../../types/types";
import { FC } from "react";

type props = {
  isLoading: boolean;
  error: Error | null;
  data: GeoData[] | undefined;
};

export const BarChart: FC<props> = ({ isLoading, error, data }) => {
  const uniqueFilter = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <Chart id={"Chart"}>
      {data !== undefined && (
        <Bar
          data={{
            labels: data
              .map((it: GeoData) => it.timestamp)
              .filter(uniqueFilter),
            datasets: [
              {
                label: "Temperatura",
                data: data.map((it: GeoData) => it.temperature),
              },
            ],
          }}
        />
      )}
    </Chart>
  );
};
