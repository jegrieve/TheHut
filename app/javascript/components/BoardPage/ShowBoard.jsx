import React, {useEffect, useState} from "react";
import PostFeed from "../Homepage/PostFeed";
import Board from "../Homepage/Board";

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
            setBoardData(response)
          })
          .catch(() => console.log("error"));
    }

    const submitEditBoardData = (boardId, editBoardData) => {
      const body = {
        title: editBoardData["title"],
        body: editBoardData["body"]
    }
      const url = `/api/v1/boards/update/${boardId}`;
      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
      method: "PATCH",
      headers: {
      "X-CSRF-Token": token, 
      "Content-Type": "application/json"
    },
      body: JSON.stringify(body)
    })
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error("Network response was not ok.");
    })
    .then(response => {
        getBoardData();
    })
    .catch(error => console.log(error.message))
    }

    const confirmDeleteBoard = (boardId) => {
      const url = `/api/v1/boards/destroy/${boardId}`;
      const token = document.querySelector('meta[name="csrf-token"]').content;
    
      fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((response) => {
          props.history.push("/");
        })
        .catch(error => console.log(error.message));
    }

    const submitEditBoardImage = (boardId, editBoardData) => {
      const formData =  new FormData();
      formData.append('board_image', editBoardData["board_image"]);
      const url = `/api/v1/boards/update/${boardId}?type=${"image"}`;
      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
      method: "PATCH",
      body: formData,
      headers: {
      "X-CSRF-Token": token, 
    },
  })
      .then(response => {
          if (response.ok) {
              return response.json()
          }
          throw new Error("Network response was not ok.");
      })
      .then(response => {
          getBoardData();
      })
      .catch(error => console.log(error.message))
    }

    
    return (
      <div className = "boardpage">
        <div className = "boardpage-container container">
          <div className = "row">
            <div className = "col-md-12 col-lg-12">
              {boardData ? <Board data = {boardData} currentUser = {props.currentUser} submitEditBoardData = {submitEditBoardData} 
              confirmDeleteBoard = {confirmDeleteBoard} submitEditBoardImage = {submitEditBoardImage}/> : false}
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