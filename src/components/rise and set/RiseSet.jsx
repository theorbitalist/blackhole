import React, { useEffect, useState } from "react";
import "./RiseSet.css";

const RiseSet = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAstronomy = async () => {
      try {
        const api_key = import.meta.env.VITE_RISE_AND_SET;
        const res = await fetch(
          `https://api.ipgeolocation.io/v2/astronomy?apiKey=${api_key}`
        );

        if (!res.ok) throw new Error("Failed to fetch astronomy data");

        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAstronomy();
  }, []);

  if (loading) return <p>Loading astronomy data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const { location, astronomy } = data;

  return (
    <div className="w-2/3 h-100 p-5 m-5 container-outline flex flex-col gap-5 items-center overflow-y-auto custom-scrollbar">
      <h1>Rise & Set</h1>

      {/* LOCATION INFO */}
      <div className="p-3 container-outline w-full flex justify-between riseset-font">
        <div className="w-1/2 border-r border-r-(--white) px-5">
          <small><span className="text-(--red)">Continent</span> : {location.continent_name}</small><br />
          <small><span className="text-(--red)">Country</span> : {location.country_name}</small><br />
          <small><span className="text-(--red)">State</span> : {location.state_prov}</small><br />
          <small><span className="text-(--red)">District</span> : {location.district}</small><br />
        </div>

        <div className="w-1/2 px-5">
          <small><span className="text-(--red)">City</span> : {location.city}</small><br />
          <small><span className="text-(--red)">Zipcode</span> : {location.zipcode}</small><br />
          <small><span className="text-(--red)">Latitude</span> : {location.latitude}</small><br />
          <small><span className="text-(--red)">Longitude</span> : {location.longitude}</small><br />
        </div>
      </div>

      {/* ASTRONOMY INFO */}
      <div className="p-3 container-outline w-full flex justify-between riseset-font">
        <div className="w-1/2 border-r border-r-(--white) px-5">
          <small><span className="text-(--red)">Date</span> : {astronomy.date}</small><br />
          <small><span className="text-(--red)">Mid Night</span> : {astronomy.mid_night}</small><br />
          <small><span className="text-(--red)">Sunrise</span> : {astronomy.sunrise}</small><br />
          <small><span className="text-(--red)">Sunset</span> : {astronomy.sunset}</small><br />
        </div>

        <div className="w-1/2 px-5">
          <small><span className="text-(--red)">Day Length</span> : {astronomy.day_length}</small><br />
          <small><span className="text-(--red)">Moon Phase</span> : {astronomy.moon_phase.replace("_", " ")}</small><br />
          <small><span className="text-(--red)">Moonrise</span> : {astronomy.moonrise}</small><br />
          <small><span className="text-(--red)">Moonset</span> : {astronomy.moonset}</small><br />
        </div>
      </div>
    </div>
  );
};

export default RiseSet;
