import React, { useEffect, useState } from "react";
import "./Blogs.css";

import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Blogs = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.spaceflightnewsapi.net/v4/blogs/?limit=10")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch articles");
        return res.json();
      })
      .then((data) => {
        setNews(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-2/4 h-150 p-5 m-5 flex flex-col items-center container-outline gap-5 overflow-y-auto custom-scrollbar">
      <h1>Top Blogs</h1>

      {/* Loading */}
      {loading && <p>Loading space articles...</p>}

      {/* Error */}
      {error && <p className="text-(--red)">{error}</p>}

      {/* Articles */}
      {!loading && !error && (
        <div className="grid grid-cols-2 gap-5 w-full">
          {news.map((item) => {
            const author = item.authors?.[0];

            return (
              <div key={item.id} className="p-3 container-outline w-full">
                <h1>{item.title}</h1>

                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <br />

                <span className="inline-flex items-center bg-(--white) px-2 py-1 text-xs font-medium text-(--grey)">
                  {item.news_site}
                </span>
                <br />

                <small>
                  <span className="text-(--red)">Author</span> :{" "}
                  {author?.name || "Unknown"}
                </small>
                <br />

                {/* Author Socials */}
                {author?.socials && (
                  <small className="flex gap-2 items-center">
                    <span className="text-(--red)">Author Socials</span> :
                    {author.socials.instagram && (
                      <a
                        href={author.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-(--red)"
                      >
                        <FaInstagram />
                      </a>
                    )}
                    {author.socials.x && (
                      <a
                        href={author.socials.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-(--red)"
                      >
                        <FaXTwitter />
                      </a>
                    )}
                    {author.socials.youtube && (
                      <a
                        href={author.socials.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-(--red)"
                      >
                        <FaYoutube />
                      </a>
                    )}
                    {author.socials.linkedin && (
                      <a
                        href={author.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-(--red)"
                      >
                        <FaLinkedin />
                      </a>
                    )}
                  </small>
                )}

                <small>
                  <span className="text-(--red)">Published at</span> :{" "}
                  {new Date(item.published_at).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })}{" "}
                  IST
                </small>
                <br />

                <small>
                  <span className="text-(--red)">Summary</span> :{" "}
                  {item.summary?.slice(0, 180)}...
                </small>

                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <button className="w-full bg-(--white) hover:bg-(--less-white) text-(--grey) p-2 mt-2 cursor-pointer">
                    Read on Official Page
                  </button>
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Blogs;
