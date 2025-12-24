import React, { useEffect, useState } from "react";
import "./Astronauts.css";

const Astronauts = () => {

  const [astronauts, setAstronauts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchAstronauts = async () => {
    try {
      const res = await fetch("https://blackhole-backend-4dbn.onrender.com/api/astronauts");
      const data = await res.json();
      setAstronauts(data.data);
    } catch {
      setError("Failed to fetch astronauts");
    } finally {
      setLoading(false);
    }
  };

  fetchAstronauts();
}, []);


//  const extractAstronauts = (htmlString) => {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(htmlString, "text/html");

//   // Get all astronaut blocks (each h2 + image pair), filtering out long headings
//   const nameElements = Array.from(doc.querySelectorAll("h2")).filter(el => el.textContent.trim().length <= 70);
//   const imageElements = doc.querySelectorAll("img[data-image]");

//   // Extract all mission dates from scripts
//   const scriptText = doc.body.innerHTML;
//   const dateMatches = [...scriptText.matchAll(/new Date\("([^"]+)"\)/g)]
//     .map(m => new Date(m[1]));

//   const data = Array.from(nameElements).map((el, i) => ({
//     name: el.textContent.trim(),
//     image: imageElements[i]?.src || null,
//     missionStart: dateMatches[i] || null
//   }));

//   setAstronauts(data.filter(a => a.name && a.image));
// };

useEffect(() => {
  console.log(astronauts);
}, [astronauts]);


const getTimeInSpace = (startDate) => {
  if (!startDate) return "N/A";

  const start = new Date(startDate); // ✅ convert string → Date

  if (isNaN(start.getTime())) return "N/A";

  const now = Date.now();
  const diff = now - start.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  return `${days}d ${hours}h`;
};



  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-1/3 h-150 p-5 m-5 container-outline flex flex-col gap-5  overflow-y-auto custom-scrollbar">
      <h1>People in Space</h1>
      {astronauts.map((a, i) => (
  <div key={i} className="flex items-center gap-4 border p-3 rounded">
    <img
      src={a.image}
      className="w-16 h-16 rounded-full object-cover"
    />
    <div>
      <h2 className="font-bold">{a.name}</h2>
      <p className="text-sm text-gray-400">
        Mission time: {getTimeInSpace(a.missionStart)}
      </p>
    </div>
  </div>
))}

    </div>
  );
};

export default Astronauts;
