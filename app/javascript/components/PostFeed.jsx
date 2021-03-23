import React, {useEffect, useState} from "react";
import FeedPost from "./FeedPost"

const PostFeed = () => {
    const [loadedFeedPosts, setLoadedFeedPosts] = useState([]);
    const [cachedPosts, setCachedPosts] = useState([]);
    const [fetchedPosts, setFetchedPosts] = useState({offset: -5});
    
    useEffect(() => {
        setFetchedPosts({offset: fetchedPosts['offset'] + 5})
    }, [loadedFeedPosts])

    useEffect(() => {
        setCachedPosts((prevState) => (
            [...prevState].concat(loadedFeedPosts)
        ))
    }, [fetchedPosts])

    const getPosts = () => {
        const limit = 5;
        const url = `/api/v1/posts/index?limit=${limit}&offset=${fetchedPosts['offset']}`;
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
     if (cachedPosts.length > 0) {
        return (
            <div id = "postfeed">
            {cachedPosts.map((el,i) => {
            return (
                <div className = "post" key = {i}>
                    <FeedPost id ={el.id} title ={el.title} body ={el.body} img ={el.image} />
                </div>
            )
            })}
            <button onClick = {getPosts}>Load more</button>
            </div>
        )}
        else {
            return (
                <div id = "postfeed">
                    <button onClick = {getPosts}>Get Posts</button>
                    No posts to show.
                </div>
            )
        }
     }




export default PostFeed;