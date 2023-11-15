import { MapContainer, TileLayer } from "react-leaflet";
import { FC } from "react";
import "leaflet/dist/leaflet.css";
import "../../../index.css";

export const Map: FC = () => {
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
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};
