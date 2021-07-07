import React, {useEffect, useState} from "react";
import FeedPost from "./FeedPost"
import { NavLink } from "react-router-dom";


const ShowBoard = (props) => {
    const [boardData, setBoardData] = useState(null);
    const [loadedBoardPosts, setLoadedBoardPosts] = useState([]);
    const [cachedBoardPosts, setCachedBoardPosts] = useState([]);
    const [fetchedBoardPosts, setFetchedBoardPosts] = useState({offset: 0});
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        getUserData();
    }, [])

    useEffect(() => {
        if (props.currentUser === null || currentUser === null) {
            if ((props.currentUser === null && currentUser !== null) || (props.currentUser !== null && currentUser === null)) {
                getUserData();
            }
        } else if (props.currentUser.username !== currentUser.username) {
            getUserData();
        }});

    
    useEffect(() => {
        if (loadedBoardPosts.length > 0) {
            setFetchedBoardPosts({offset: fetchedBoardPosts['offset'] + 10})
        } 
    }, [loadedBoardPosts])

    useEffect(() => {
        setCachedBoardPosts((prevState) => (
            [...prevState].concat(loadedBoardPosts)
        ))
    }, [fetchedBoardPosts])

    useEffect(() => {
        getBoardData();
    }, [])

    
    useEffect(() => {
        getBoardPosts();
    }, [])

    const getUserData = () => {
        const url = "/api/v1/sessions/index";
        fetch(url)
          .then(response => {
            if (response.ok && response) {
              return response.json();
            }
            throw new Error("Could not login this user");
          })
          .then(response => setCurrentUser(response))
          .catch(() => setCurrentUser(null));
    }


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
          .then(response => setBoardData(response))
          .catch(() => console.log("error"));
    }

    const getBoardPosts = () => {
        const id = props.match.params.id
        const limit = 10;
        const url = `/api/v1/boards/show/${id}?limit=${limit}&offset=${fetchedBoardPosts['offset']}`;
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
            setLoadedBoardPosts(response)
          })
          .catch(() => console.log("error"));
    }
    
    return (
        <div>
            {cachedBoardPosts.length && boardData ? 
            <div className = "container">
            <div className = "show-board-postfeed row">
                <div className = "col-12 col-md-6">
                    <div className = "show-board-title">{boardData.title}</div>
                     <div className = "show-board-body">{boardData.body}</div>
                     <div className = "show-board-created">
                         <NavLink className = "text-link" to={`/user/${boardData.user_id.id}`}>
                            <div>created by {boardData.user_id.username}</div>
                         </NavLink>
                         <div>created on {boardData.created_at}</div>
                     </div>
                </div>
                <div className = "col-12 col-md-6">
                     <img className = "show-board-img" src = {boardData.board_image.url} />
                </div>
                {console.log(boardData)}

            </div>
            <hr />
        {cachedBoardPosts.map((el,i) => {
        return (
            <div className = "board-post" key = {"b" + i}>
                <FeedPost postData = {el} currentUser = {currentUser} />
                <hr />
            </div>
        )
        })}
        <button onClick = {getBoardPosts}>Load more</button>
        </div>
            : 
            <div id = "board-postfeed">
            <button onClick = {getBoardPosts}>Get Posts</button>
            No posts to show.
        </div>}
        </div>
    )
}




export default ShowBoard;