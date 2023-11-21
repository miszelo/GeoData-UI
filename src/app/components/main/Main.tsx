import { Map } from "../map/Map";
import { ChartContainer, ChartTitle } from "../chart/ChartStyles";
import { MapContainer, MapTitle } from "../map/MapStyles";
import { MainContainer } from "./MainStyles";
import { fetchData } from "../../apiCaller";
import { ChartContent } from "../chart/ChartContent";
import { capitalizeFirstLetter } from "../../utils/stringUtils";

export const Main = () => {
  const { isLoading, error, data, isFetched } = fetchData();
  const cities =
    data?.map((it) => capitalizeFirstLetter(it.place.city.toLowerCase())) ?? [];
  return (
    <MainContainer>
      <MapContainer>
        {isFetched && <MapTitle>Mapa</MapTitle>}
        <Map data={data} isLoading={isLoading} error={error} />
      </MapContainer>
      <ChartContainer>
        {isFetched && <ChartTitle>Wykres</ChartTitle>}
        {isFetched && <ChartContent cities={cities} />}
      </ChartContainer>
    </MainContainer>
  );
};
