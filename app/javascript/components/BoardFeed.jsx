import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

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
            {props.currentUser ? <NavLink className = "board-link" to="/create-board">
              <div className = "create-new-board">
                <FontAwesomeIcon icon = {faPlus} /> <span>new board</span>
              </div>
            </NavLink> : 
              <div className = "signed-out-create-board"></div>}
            {cachedBoards.length ? 
              <div className = "board-feed-container">
                {cachedBoards.map((el,i) => {
                return (
                    <div className = "board" key = {"b" + i}>
                        <NavLink className = "board-link" to={`/board/${el.id}`}>b/{el.title}</NavLink>
                    </div>
                )
                })}
              </div>
            : false}
            <div className = "d-flex justify-content-center">
              {cachedBoards.length >= 10 ? 
                <button className = "btn btn-secondary load-more-boards" onClick = {getBoards}>Load more</button>
               : false}
            </div>
        </div>
    )
 }




export default BoardFeed;