import {Map} from "../map/Map";
import {ChartContainer, ChartTitle} from "../chart/ChartStyles";
import {MapContainer, MapTitle} from "../map/MapStyles";
import {MainContainer} from "./MainStyles";
import {fetchData} from "../api/apiCaller";
import {CityChart} from "../chart/CityChart";
import {capitalizeFirstLetter} from "../../utils/stringUtils";
import Select, {SingleValue} from "react-select";
import {SchoolChart} from "../chart/SchoolChart";
import {useState} from "react";
import {SelectType} from "../../types/types";
import {CityChartByDateRange} from "../chart/CityChartDateRange";
import {SchoolChartByDateRange} from "../chart/SchoolSchartByDateRange";

export const Main = () => {
    const {isLoading, error, data, isFetched} = fetchData();
    const cities =
        data?.map((it) => capitalizeFirstLetter(it.place.city.toLowerCase())) ?? [];
    const schools = data?.map((it) => capitalizeFirstLetter(it.place.name)) ?? [];

    const [selectedChart, setSelectedChart] = useState<
        SelectType<string, number>
    >({label: "Miasto", value: 0});
    const [selectedChartRange, setSelectedChartRange] = useState<
        SelectType<string, number>
    >({label: "Miasto", value: 0});
    const handleSelectChartType = (
        newValue: SingleValue<SelectType<string, number>>, chartType: "DATE" | "DATE_RANGE"
    ) => {
        if (chartType === "DATE") {
            newValue && setSelectedChart(newValue);
        } else {
            newValue && setSelectedChartRange(newValue);
        }
    };
    return (
        <MainContainer>
            <MapContainer>
                {isFetched && <MapTitle>Interaktywna mapa z aktualnymi danymi</MapTitle>}
                <Map data={data} isLoading={isLoading} error={error}/>
            </MapContainer>
            <ChartContainer>
                {isFetched && <ChartTitle>Wykres z danymi na podstawie lokalizacji i daty</ChartTitle>}
                <Select
                    options={[
                        {label: "Miasto", value: 0},
                        {label: "Szkoła", value: 1},
                    ]}
                    onChange={(value) => handleSelectChartType(value, "DATE")}
                    defaultValue={selectedChart}
                ></Select>
                {isFetched && selectedChart.value === 0 ? (
                    <CityChart cities={cities}/>
                ) : (
                    <SchoolChart schools={schools}/>
                )}
            </ChartContainer>
            <ChartContainer>
                {isFetched && <ChartTitle>Wykres z danymi na podstawie lokalizacji i zakresu dat</ChartTitle>}
                <Select
                    options={[
                        {label: "Miasto", value: 0},
                        {label: "Szkoła", value: 1},
                    ]}
                    onChange={(value) => handleSelectChartType(value, "DATE_RANGE")}
                    defaultValue={selectedChartRange}
                ></Select>
                {isFetched && selectedChartRange.value === 0 ? (
                    <CityChartByDateRange cities={cities}/>
                ) : (
                    <SchoolChartByDateRange schools={schools}/>
                )}
            </ChartContainer>
        </MainContainer>
    );
};
