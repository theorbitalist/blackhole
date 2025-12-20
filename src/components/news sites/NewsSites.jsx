    import React, { useEffect, useState } from "react";
    import "./NewsSites.css";

    const NewsSites = () => {
    const [sites, setSites] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSites = async () => {
        try {
            const res = await fetch(
            "https://api.spaceflightnewsapi.net/v4/info/"
            );
            if (!res.ok) throw new Error("Failed to fetch news sites");

            const data = await res.json();
            setSites(data.news_sites);
        } catch (err) {
            setError(err.message);
        }
        };

        fetchSites();
    }, []);

    return (
        <div className="marquee-container my-5">
  <div className="marquee-track">
    {sites.concat(sites).map((site, i) => (
      <span key={i} className="marquee-item">
        {site}
      </span>
    ))}
  </div>
</div>
    );
    };

    export default NewsSites;
