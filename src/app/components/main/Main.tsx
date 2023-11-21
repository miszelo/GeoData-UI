import { Map } from "../map/Map";
import { ChartContainer } from "../chart/ChartStyles";
import { MapContent, MapTitle } from "../map/MapStyles";
import { MainContainer } from "./MainStyles";
import { fetchData } from "../../apiCaller";
import { ChartContent } from "../chart/ChartContent";
import { capitalizeFirstLetter } from "../../utils/stringUtils";

export const Main = () => {
  const { isLoading, error, data } = fetchData();
  const cities =
    data?.map((it) => capitalizeFirstLetter(it.place.city.toLowerCase())) ?? [];
  return (
    <MainContainer>
      <MapContent>
        <MapTitle>Aktualne dane </MapTitle>
        <Map data={data} isLoading={isLoading} error={error} />
      </MapContent>
      <ChartContainer>
        <ChartContent cities={cities} />
      </ChartContainer>
    </MainContainer>
  );
};
