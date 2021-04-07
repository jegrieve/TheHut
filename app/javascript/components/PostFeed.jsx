import React, {useEffect, useState} from "react";
import FeedPost from "./FeedPost"
import { NavLink } from "react-router-dom";

const PostFeed = (props) => {
    const [loadedFeedPosts, setLoadedFeedPosts] = useState([]);
    const [cachedPosts, setCachedPosts] = useState([]);
    const [fetchedPosts, setFetchedPosts] = useState({offset: 0});
    const [filterPostsValue, setFilterPostsValue] = useState('newest');

    useEffect(() => {
        if (loadedFeedPosts.length > 0) {
            setFetchedPosts({offset: fetchedPosts['offset'] + 5})
        } 
    }, [loadedFeedPosts])

    useEffect(() => {
        setCachedPosts((prevState) => (
            [...prevState].concat(loadedFeedPosts)
        ))
    }, [fetchedPosts])

    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = () => {
        const limit = 5;
        const url = `/api/v1/posts/index?limit=${limit}&offset=${fetchedPosts['offset']}&filter=${filterPostsValue}`;
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
            setLoadedFeedPosts(response)
          })
          .catch(() => console.log("error"));
    }
    const handleFilterChange = (e) => {
        setFilterPostsValue(e.target.value)
    }
    
     if (cachedPosts.length > 0) {
        return (
            <div id = "postfeed">
                <label>Filter by:
                    <select name = "filter" value = {filterPostsValue} onChange = {handleFilterChange}>
                        <option value = "newest">Newest</option>
                        <option value = "oldest">Oldest</option>
                    </select>
                </label>
            {cachedPosts.map((el,i) => {
            return (
                <div className = "post" key = {i}>
                    <NavLink className = "text-link" to={`/post/${el.id}`}>
                        <FeedPost currentUser = {props.currentUser} id ={el.id} title ={el.title} body ={el.body} img ={el.image}  currentUser = {props.currentUser} />
                    </NavLink>
                </div>
            )
            })}
            <button onClick = {getPosts}>Load more</button>
            </div>
        )}
        else {
            return (
                <div id = "postfeed">
                    No posts to show.
                </div>
            )
        }
     }




export default PostFeed;