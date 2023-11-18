import { Chart } from "./ChartStyles";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { GeoData } from "../../types/types";
import { FC } from "react";

type props = {
  isLoading: boolean;
  error: Error | null;
  data: GeoData[];
};

export const BarChart: FC<props> = ({ isLoading, error, data }) => {
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <Chart>
      <Bar
        data={{
          labels: data.slice(0, 5).map((it) => it.place.city),
          datasets: [
            {
              label: "Temperatura",
              data: data.slice(0, 5).map((it) => it.temperature),
            },
          ],
        }}
      />
    </Chart>
  );
};
