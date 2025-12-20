import React from "react";
import Container from "../components/upcoming launches/Container";
import POTD from "../components/picture of the day/POTD";
import News from "../components/space news/News";
import Blogs from "../components/space blogs/Blogs";
import NewsSites from "../components/news sites/NewsSites";
import ISSNow from "../components/iss now/ISSNow";
import Astronauts from "../components/astronauts in space/Astronauts";
import RiseSet from "../components/rise and set/RiseSet";
import Fact from "../components/fact of the day/Fact";
import Epic from "../components/epic/Epic";
import Navbar from "../components/navbar/Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Container />
        <POTD />
      </div>
      <div className="flex">
        <News />
        <Blogs />
      </div>
      <NewsSites />
      <div className="flex">
        <ISSNow />
        <Astronauts />
      </div>
      <div className="flex">
        <Fact />
        <RiseSet />
      </div>

      <div className="px-5">
        <Epic />
      </div>

      <div className="border-t border-t-(--white) w-11/12 mx-auto my-5">
        <p className="text-center my-3 text-xl">Blackhole by The <span className="text-(--red)">Orbitalist</span> Company.</p>
      </div>
    </div>
  );
};

export default Dashboard;
