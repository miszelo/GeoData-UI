import { MapContainer, TileLayer } from "react-leaflet";
import { FC } from "react";
import "leaflet/dist/leaflet.css";
import "../myMap.css";

export const MyMap: FC = () => {
  return (
    <div className={"myMap"}>
      <MapContainer
        center={[51.582095, 19.704675]}
        zoom={7}
        style={{ height: "80vh", width: "200vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};
