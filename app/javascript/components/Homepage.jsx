import React from "react";
import Navbar from "./Navbar"
import PostFeed from "./PostFeed"

const Homepage = () => (
  <div>
      <Navbar />
      <div className = "container">
        <div className = "row">
          <div className = "col-md-12 col-lg-9">
            <PostFeed />
          </div>
          <div className = "col-3 d-none d-lg-block">
            fsadfads
          </div>
        </div>
      </div>
  </div>
);

export default Homepage;