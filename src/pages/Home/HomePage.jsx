import React from "react";
import AllArtists from "../../components/AllArtists/AllArtists";
import AllCreations from "../../components/AllCreations/AllCreations";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      <section className="intro-home-page">
        <img
          className="logo-octopus-home-page"
          src="images/logos/intro-logo.png"
        ></img>
        <h6>
          A marketplace for creativity to spread art everywhere. From unique
          handcrafted pieces to art treasures...
        </h6>
      </section>
      <section className="artists-home-page">
        <AllArtists></AllArtists>
      </section>
      <section className="creations-home-page">
        <AllCreations></AllCreations>
      </section>
    </div>
  );
};

export default HomePage;
