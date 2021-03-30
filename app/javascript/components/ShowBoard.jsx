import React, {useEffect, useState} from "react";
import FeedPost from "./FeedPost"
import { NavLink } from "react-router-dom";


const ShowBoard = (props) => {
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
        getBoardPosts();
    }, [])

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
    
     if (cachedBoardPosts.length > 0) {
        return (
            <div id = "board-postfeed">
            {cachedBoardPosts.map((el,i) => {
            return (
                <div className = "board-post" key = {i}>
                    <NavLink to={`/post/${el.id}`}>{el.id}</NavLink>
                    <FeedPost id ={el.id} title ={el.title} body ={el.body} img ={el.image} />
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