import React, { useEffect, useState } from "react";
import "./Fact.css";

const API_URL = "https://f-api.ir/api/facts/category/astronomy";

const Fact = () => {
  const [fact, setFact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];

        const savedDate = localStorage.getItem("factDate");
        const savedFact = localStorage.getItem("todayFact");

        // If already selected today → reuse
        if (savedDate === today && savedFact) {
          setFact(JSON.parse(savedFact));
          setLoading(false);
          return;
        }

        const res = await fetch(API_URL);
        const data = await res.json();

        let usedIds = JSON.parse(localStorage.getItem("usedFactIds")) || [];

        // Reset if all facts are used
        if (usedIds.length >= data.length) {
          usedIds = [];
        }

        const unusedFacts = data.filter(f => !usedIds.includes(f.id));

        // Pick random unused fact
        const randomFact =
          unusedFacts[Math.floor(Math.random() * unusedFacts.length)];

        // Save
        localStorage.setItem("factDate", today);
        localStorage.setItem("todayFact", JSON.stringify(randomFact));
        localStorage.setItem(
          "usedFactIds",
          JSON.stringify([...usedIds, randomFact.id])
        );

        setFact(randomFact);
      } catch (error) {
        console.error("Failed to fetch fact", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFact();
  }, []);

  if (loading) return <p>Loading fact...</p>;
  if (!fact) return <p>No fact available</p>;

  return (
    <div className="w-1/3 h-100 p-5 m-5 container-outline flex flex-col gap-5 items-center overflow-y-auto custom-scrollbar">
      <h1>Fact of the Day</h1>

      <div className="p-3 container-outline w-full">
        <h1>{fact.title}</h1>

        <div className="flex gap-3 my-2">
          {fact.verified && (
            <span className="inline-flex items-center bg-(--white) px-2 py-1 text-xs font-medium text-(--grey)">
              Verified
            </span>
          )}
          <span className="inline-flex items-center bg-(--white) px-2 py-1 text-xs font-medium text-(--grey)">
            {fact.source}
          </span>
        </div>

        <small>
          <span className="text-(--red)">Fact</span> : {fact.fact}
        </small>
        <br />
        <small>
          <span className="text-(--red)">Year of Discovery</span> :{" "}
          {fact.year_discovered}
        </small>
      </div>
    </div>
  );
};

export default Fact;
