import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";

const BoardFeed = (props) => {
    const [loadedBoards, setLoadedBoards] = useState([]);
    const [cachedBoards, setCachedBoards] = useState([]);
    const [fetchedBoards, setFetchedBoards] = useState({offset: 0});
    
    useEffect(() => {
        if (loadedBoards.length > 0) {
            setFetchedBoards({offset: fetchedBoards['offset'] + 10})
        } 
    }, [loadedBoards])

    useEffect(() => {
        setCachedBoards((prevState) => (
            [...prevState].concat(loadedBoards)
        ))
    }, [fetchedBoards])

    useEffect(() => {
        getBoards();
    }, [])

    const getBoards = () => {
        const limit = 10;
        const url = `/api/v1/boards/index?limit=${limit}&offset=${fetchedBoards['offset']}`;
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
            setLoadedBoards(response)
          })
          .catch(() => console.log("error"));
    }

    return (
        <div id = "boardfeed">
            <div className = "board-title">Boards</div>
            {props.currentUser ? <NavLink className = "board-link" to="/create-board">(+) Create a new board</NavLink> : false}
            {cachedBoards.length ? 
              <div className = "board-feed-container">
                {cachedBoards.map((el,i) => {
                return (
                    <div className = "board" key = {"b" + i}>
                        <NavLink className = "board-link" to={`/board/${el.id}`}>{el.title}</NavLink>
                    </div>
                )
                })}
              </div>
            : false}
            <button onClick = {getBoards}>Load more</button>
        </div>
    )
 }




export default BoardFeed;