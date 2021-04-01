import React from "react";
import PostFeed from "./PostFeed"
import BoardFeed from "./BoardFeed"

const Homepage = (props) => (
  <div>
      <div className = "container">
        <div className = "row">
          <div className = "col-md-12 col-lg-9">
            <PostFeed currentUser = {props.currentUser} />
          </div>
          <div className = "col-3 d-none d-lg-block">
            <BoardFeed />
          </div>
        </div>
      </div>
  </div>
);

export default Homepage;