import React, { useEffect, useState } from "react";
import "./Epic.css";

const Epic = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpicPhotos = async () => {
      try {
        const res = await fetch("https://epic.gsfc.nasa.gov/api/natural");
        if (!res.ok) throw new Error("Failed to fetch EPIC data");

        const data = await res.json();
        setPhotos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEpicPhotos();
  }, []);

  const getImageUrl = (item) => {
    const date = new Date(item.date);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${item.image}.png`;
  };

  if (loading) return <p>Loading EPIC photos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full h-150 p-5 my-5 container-outline flex flex-col gap-5 items-center justify-start overflow-y-auto custom-scrollbar">
      <h1>EPIC Photos</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
        {photos.map((item) => (
          <div key={item.identifier} className="p-3 container-outline">
            <img
              src={getImageUrl(item)}
              alt={item.caption}
              className="w-full mb-2"
            />

            <small>
              <span className="text-(--red)">Date</span> :{" "}
              {item.date.split(" ")[0]}
            </small>
            <br />

            <small>
              <span className="text-(--red)">Caption</span> : {item.caption}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Epic;
