import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { FC } from "react";
import "leaflet/dist/leaflet.css";
import "../../../index.css";
import { useQuery } from "@tanstack/react-query";
import { GeoData } from "../types/place";

export const Map: FC = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["currentData"],
    queryFn: () =>
      fetch("http://localhost:8080/api/v1/smog-data").then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      }),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const geoData: GeoData[] = data;

  return (
    <div className={"map"}>
      <MapContainer
        center={[51.582095, 19.704675]}
        zoom={7}
        style={{
          minHeight: "50vh",
          minWidth: "60vw",
        }}
      >
        {geoData.map((place) => {
          return (
            <Marker
              position={{
                lat: place.place.coordinates.latitude,
                lng: place.place.coordinates.longitude,
              }}
            >
              <Popup>
                <h2>{place.place.name}</h2>
                <p>Dane:</p>
                <a>pm10: {place.pm10}</a>
                <a>pm2.5: {place.pm25}</a>
                <a>Wilgotność: {place.humidity}</a>
                <a>Temperatura: {place.temperature}</a>
              </Popup>
            </Marker>
          );
        })}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};
