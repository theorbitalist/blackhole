import React, { useEffect, useState } from "react";
import "./ISSNow.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const ISSNow = () => {
  const [issData, setIssData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchISS = async () => {
      try {
        const res = await fetch(
          "https://api.wheretheiss.at/v1/satellites/25544"
        );
        const data = await res.json();
        setIssData(data);
      } catch (err) {
        setError("Failed to load ISS location");
      }
    };

    fetchISS();

    // Update every 5 seconds
    const interval = setInterval(fetchISS, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-2/3 h-150 p-5 m-5 container-outline flex flex-col gap-5 items-center overflow-y-auto custom-scrollbar">
      <h1>Live Location of International Space Station</h1>

      {error && <p className="text-red-500">{error}</p>}

      {issData && (
        <>
          {/* MAP */}
          <div className="w-full h-400">
            <MapContainer
              center={[issData.latitude, issData.longitude]}
              zoom={3}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={[issData.latitude, issData.longitude]} >
                <Popup>
                  <strong>ISS Current Location</strong>
                  <br />
                  Lat: {issData.latitude.toFixed(2)}
                  <br />
                  Lon: {issData.longitude.toFixed(2)}
                  <br />
                  Altitude: {issData.altitude.toFixed(2)} km
                  <br />
                  Speed: {issData.velocity.toFixed(2)} km/h
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* INFO */}
          <div className="w-full text-left iss-font">
            <small><span className="text-(--red)">Visibility</span> : {issData.visibility}</small><br />
            <small><span className="text-(--red)">Speed</span> : {issData.velocity.toFixed(2)} km/h</small><br />
            <small><span className="text-(--red)">Altitude</span> : {issData.altitude.toFixed(2)} km</small>
          </div>
        </>
      )}
    </div>
  );
};

export default ISSNow;
