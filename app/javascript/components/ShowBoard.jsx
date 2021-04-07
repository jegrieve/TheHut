import React, {useEffect, useState} from "react";
import FeedPost from "./FeedPost"
import { NavLink } from "react-router-dom";


const ShowBoard = (props) => {
    const [boardData, setBoardData] = useState(null);
    const [loadedBoardPosts, setLoadedBoardPosts] = useState([]);
    const [cachedBoardPosts, setCachedBoardPosts] = useState([]);
    const [fetchedBoardPosts, setFetchedBoardPosts] = useState({offset: 0});
    
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
    
     if (cachedBoardPosts.length > 0 && boardData) {
        return (
            <div id = "board-postfeed">
                {console.log(boardData)}
                <div>{boardData.title}</div>
                <div>{boardData.body}</div>
                <div>eventual image</div>
            {cachedBoardPosts.map((el,i) => {
            return (
                <div className = "board-post" key = {i}>
                    <NavLink to={`/post/${el.id}`}>{el.id}</NavLink>
                    <FeedPost board = {el.board} user = {el.user} created_at = {el.created_at} id ={el.id} title ={el.title} body ={el.body} img ={el.image} />
                </div>
            )
            })}
            <button onClick = {getBoardPosts}>Load more</button>
            </div>
        )}
        else {
            return (
                <div id = "board-postfeed">
                    <button onClick = {getBoardPosts}>Get Posts</button>
                    No posts to show.
                </div>
            )
        }
}




export default ShowBoard;