import {Chart} from "./ChartStyles";
import {Bar} from "react-chartjs-2";
import "chart.js/auto";
import {GeoData} from "../../types/types";
import {FC} from "react";
import {formatDateToStringOnlyDate, formatDateToStringOnlyTime} from "../../utils/stringUtils";
import {filterRepeatedDates} from "../../utils/chartUtils";

type Props = {
    isLoading: boolean;
    error: Error | null;
    data: GeoData[];
    dataType: { label: string; value: string };
    byDateRange?: boolean;
};

export const BarChart: FC<Props> = ({isLoading, error, data, dataType, byDateRange}) => {
    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;
    return (
        <Chart id={"Chart"}>
            <Bar
                data={{
                    labels: data
                        .map((it: GeoData) => byDateRange ? formatDateToStringOnlyDate(it.timestamp) : formatDateToStringOnlyTime(it.timestamp))
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
                options={{
                    maintainAspectRatio : false
                }}
            />
        </Chart>
    );
};
