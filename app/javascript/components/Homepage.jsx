import React from "react";
import Navbar from "./Navbar"
import PostFeed from "./PostFeed"

const Homepage = () => (
  <div>
      <Navbar />
      <div className = "container">
        <PostFeed />
      </div>
  </div>
);

export default Homepage;