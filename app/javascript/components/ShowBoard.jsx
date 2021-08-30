import React, {useEffect, useState} from "react";
import PostFeed from "./PostFeed";
import Board from "./Board";
import { NavLink } from "react-router-dom";


const ShowBoard = (props) => {
    const [boardData, setBoardData] = useState(null);
    const [filterValue, setFilterValue] = useState("newest");
    
    useEffect(() => {
        getBoardData();
    }, [])

    const getBoardData = () => {
        const id = props.match.params.id
        const url = `/api/v1/boards/show/${id}`;
    
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
            console.log(response)
            setBoardData(response)
          })
          .catch(() => console.log("error"));
    }
    
    return (
      <div className = "boardpage">
        <div className = "boardpage-container container">
          <div className = "row">
            <div className = "col-md-12 col-lg-12">
              {boardData ? <Board data = {boardData} /> : false}
            </div>
          </div>
          <hr></hr>
            <div className = "row">
              <div className = "col-md-12 col-lg-12">
                {boardData ? 
                  <PostFeed currentUser = {props.currentUser} filterValue = {filterValue} setFilterValue = {setFilterValue} board = {boardData.id} /> 
                  : false}
              </div>
            </div>
          </div>
      </div>
    )
}




export default ShowBoard;