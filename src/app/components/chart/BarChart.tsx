import { Chart } from "./ChartStyles";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { GeoData } from "../../types/types";
import { FC } from "react";
import { filterRepeatedDates } from "../../utils/chartUtils";
import { formatDateToStringOnlyTime } from "../../utils/stringUtils";

type props = {
  isLoading: boolean;
  error: Error | null;
  data: GeoData[];
  dataType: { label: string; value: string };
};

export const BarChart: FC<props> = ({ isLoading, error, data, dataType }) => {
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <Chart id={"Chart"}>
      <Bar
        data={{
          labels: data
            .map((it: GeoData) => formatDateToStringOnlyTime(it.timestamp))
            .filter(filterRepeatedDates),
          datasets: [
            {
              label: dataType.label,
              data: data.map(
                (it: GeoData) => it[dataType.value as keyof GeoData],
              ),
            },
          ],
        }}
      />
    </Chart>
  );
};
