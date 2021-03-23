import React, {useState} from "react";
import FeedPost from "./FeedPost"

const PostFeed = () => {
    const [loadedFeedPosts, setLoadedFeedPosts] = useState(null)
    const getPosts = () => {
        const url = "/api/v1/posts/index";
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
     if (loadedFeedPosts) {
        return (
            <div id = "postfeed">
            {loadedFeedPosts.map((el,i) => {
            return (
                <div className = "post" key = {i}>
                    <FeedPost id ={el.id} title ={el.title} body ={el.body} img ={el.image} />
                </div>
            )
            })}
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