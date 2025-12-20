import React, { useEffect, useState } from "react";
import "./Container.css";

const Container = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fdo.rocketlaunch.live/json/launches/next/5")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch launches");
        return res.json();
      })
      .then((data) => {
        setLaunches(data.result || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-1/3 h-150 p-5 m-5 container-outline flex flex-col gap-5 items-center justify-start overflow-y-auto custom-scrollbar">
      <div>
      <h1>Upcoming Launches</h1>
      </div>
      {loading && (
        <div className="w-full text-center">
          <small>Loading launches...</small>
        </div>
      )}

      {!loading && error && (
        <div className="w-full text-(--red)">
          <small>{error}</small>
        </div>
      )}

      {!loading &&
        launches.map((launch) => (
          <div
            key={launch.id}
            className="p-3 container-outline w-full"
          >
            <h1 className="font-semibold text-lg">
              {launch.name}
            </h1>

            <small>
              <span className="text-(--red)">Description</span> :{" "}
              {launch.launch_description || "No description available"}
            </small>
            <br />

            <small>
              <span className="text-(--red)">Provider</span> :{" "}
              {launch.provider?.name}
            </small>
            <br />

            <small>
              <span className="text-(--red)">Vehicle</span> :{" "}
              {launch.vehicle?.name}
            </small>
            <br />

            <small>
              <span className="text-(--red)">Location</span> :{" "}
              {launch.pad?.location?.name},{" "}
              {launch.pad?.location?.country}
            </small>
            <br />

            <small>
              <span className="text-(--red)">Date & Time</span> :{" "}
              {launch.win_open
                ? new Date(launch.win_open).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "TBD"}{" "}
              (IST)
            </small>
          </div>
        ))}
    </div>
  );
};

export default Container;
