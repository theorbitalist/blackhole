import React, { useEffect, useState } from "react";

const POTD = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        setLoading(true);
        setError(null);

        const api_key = import.meta.env.VITE_NASA_API;

        const res = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${today}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch APOD");
        }

        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAPOD();
  }, [today]);

  return (
    <div className="w-2/3 h-150 p-5 m-5 container-outline flex flex-col gap-5 items-center justify-start overflow-y-auto custom-scrollbar">
      <h1>Astronomy Picture of the Day</h1>

      <div className="p-3 container-outline w-full">
        {loading && <p>Loading Image...</p>}

        {error && <p className="text-(--red)">Error: {error}</p>}

        {!loading && !error && data && (
          <>
            <h1>{data.title}</h1>

            {data.media_type === "image" && (
              <img
                src={data.url}
                alt={data.title}
                className="w-full"
              />
            )}

            <small>
              <span className="text-(--red)">Image by</span> :{" "}
              {data.copyright || "NASA / Public Domain"}
            </small>
            <br />

            <small>
              <span className="text-(--red)">Date</span> : {data.date}
            </small>
            <br />

            <small>
              <span className="text-(--red)">Explanation</span> :{" "}
              {data.explanation}
            </small>
          </>
        )}
      </div>
    </div>
  );
};

export default POTD;
