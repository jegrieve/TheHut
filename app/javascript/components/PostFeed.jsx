import React, {useEffect, useState} from "react";
import FeedPost from "./FeedPost"

const PostFeed = (props) => {
    const [loadedFeedPosts, setLoadedFeedPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [cachedPosts, setCachedPosts] = useState([]);
    const [fetchedPosts, setFetchedPosts] = useState({offset: 0});

    useEffect(() => {
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
      }, [])

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
        console.log(props.filterValue)
        const url = `/api/v1/posts/index?limit=${limit}&offset=${fetchedPosts['offset']}&filter=${props.filterValue}`;
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
              console.log(response)
            setLoadedFeedPosts(response)
          })
          .catch(() => console.log("error"));
    }
    const handleFilterChange = (e) => {
        props.setFilterValue(e.target.value)
    }
    
     if (cachedPosts.length > 0) {
        return (
            <div id = "postfeed">
                <label>Filter by:
                    <select name = "filter" value = {props.filterValue} onChange = {handleFilterChange}>
                        <option value = "newest">Newest</option>
                        <option value = "oldest">Oldest</option>
                    </select>
                </label>
            {cachedPosts.map((el,i) => {
            return (
                <div className = "post" key = {i}>
                    <FeedPost board = {el.board} user = {el.user} created_at = {el.created_at} id ={el.id} title ={el.title} body ={el.body} img ={el.image}  currentUser = {currentUser} />
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