import React from "react";

const PostFeed = () => {
    // let placeholderPosts = ["post1","post2","post3","post4","post5"]
    const getPosts = () => {
        const url = "/api/v1/posts/index";
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => console.log(response))
          .catch(() => console.log("error"));
    }
    return (
        <div>
            <button onClick = {getPosts}>Click for posts</button>
        {/* {placeholderPosts.map((el,i) => {
            return (
                <div className = "post" key = {i}>
                    {el}
                </div>
            )
        })} */}
        </div>
    )
}



export default PostFeed;