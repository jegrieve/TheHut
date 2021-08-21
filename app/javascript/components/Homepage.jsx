import React, {useState, useEffect} from "react";
import PostFeed from "./PostFeed"
import BoardFeed from "./BoardFeed"

const Homepage = (props) => {
  const [filterValue, setFilterValue] = useState("newest")
  return (
    <div className = "homepage">
        <div className = "homepage-container container">
          <div className = "row">
            <div className = "col-md-12 col-lg-9">
              <PostFeed currentUser = {props.currentUser} filterValue = {filterValue} setFilterValue = {setFilterValue}/>
            </div>
            <div className = "col-3 d-none d-lg-block">
              <BoardFeed currentUser = {props.currentUser} />
            </div>
          </div>
        </div>
    </div>
  );
}

export default Homepage;