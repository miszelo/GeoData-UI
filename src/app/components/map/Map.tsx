import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { FC } from "react";
import "../../../../index.css";
import { GeoData } from "../../types/types.ts";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { getIconUrl } from "./mapUtils";

type props = {
  isLoading: boolean;
  error: Error | null;
  data?: GeoData[];
};

export const Map: FC<props> = ({ isLoading, error, data }) => {
  if (isLoading) return "Ładowanie mapy...";

  if (error) return "error";

  return (
    <MapContainer
      className={"map"}
      center={[52.112795, 19.211946]}
      zoom={6}
      maxZoom={20}
      scrollWheelZoom={true}
    >
      <MarkerClusterGroup showCoverageOnHover={false}>
        {data &&
          data.map((data, index) => {
            return (
              <Marker
                key={index}
                position={{
                  lat: data.place.coordinates.latitude,
                  lng: data.place.coordinates.longitude,
                }}
                icon={
                  new Icon({
                    iconUrl: getIconUrl(data),
                    iconSize: [30, 30],
                  })
                }
              >
                <Popup>
                  <h3>{data.place.name}</h3>
                  <h4>
                    Aktualne dane: {new Date(data.timestamp).getDate()}-
                    {new Date(data.timestamp).getMonth()}-
                    {new Date(data.timestamp).getFullYear()}{" "}
                    {new Date(data.timestamp).getHours()}:
                    {new Date(data.timestamp).getMinutes().toString().length <=
                    1
                      ? "0" + new Date(data.timestamp).getMinutes()
                      : new Date(data.timestamp).getMinutes()}
                  </h4>
                  <p>
                    PM10: {data.pm10.toPrecision(data.pm10 > 10 ? 4 : 3)} µg/m³
                  </p>
                  <p>
                    PM2.5: {data.pm25.toPrecision(data.pm25 > 10 ? 4 : 3)} µg/m³
                  </p>
                  <p>Wilgotność: {data.humidity.toPrecision(4)} g/m³</p>
                  <p>Ciśnienie: {data.pressure.toPrecision(5)} hPa</p>
                  <p>Temperatura: {data.temperature.toPrecision(2)}°C</p>
                </Popup>
              </Marker>
            );
          })}
      </MarkerClusterGroup>

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};
