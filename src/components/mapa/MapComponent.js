import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapComponent.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapComponent = ({ alojamiento }) => {
  const position = [alojamiento.Latitud, alojamiento.Longitud];

  return (
    <MapContainer center={position} zoom={13} className="mapa">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker
        key={alojamiento.idAlojamiento}
        position={[
          parseFloat(alojamiento.Latitud),
          parseFloat(alojamiento.Longitud),
        ]}
      >
        <Popup>
          <b>{alojamiento.Titulo}</b>
          <br />
          {alojamiento.Descripción}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
