import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { FC } from "react";
import "leaflet/dist/leaflet.css";
import "../../../../index.css";
import { GeoData } from "../../types/types.ts";
import { MapContent } from "./MapContent";
import L from "leaflet";

type Props = {
  data: GeoData[];
  isLoading: boolean;
  error: Error | null;
};

export const Map: FC<Props> = ({ data, isLoading, error }) => {
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <MapContent>
      <MapContainer
        className={"map"}
        center={[51.582095, 19.704675]}
        zoom={7}
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
                    new L.Icon({
                      iconUrl: `/${
                        data.pm25 < 13
                          ? "perfect"
                          : data.pm25 < 35
                            ? "good"
                            : data.pm25 < 55
                              ? "ok"
                              : data.pm25 < 75
                                ? "bad"
                                : "worst"
                      }.png`,
                      iconSize: [30, 30],
                    })
                  }
                >
                  <Popup>
                    <h2>{data.place.name}</h2>
                    <p>Dane:</p>
                    <p>pm10: {data.pm10}</p>
                    <p>pm2.5: {data.pm25}</p>
                    <p>Wilgotność: {data.humidity}</p>
                    <p>Temperatura: {data.temperature}</p>
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
    </MapContent>
  );
};
