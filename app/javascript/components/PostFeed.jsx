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
          .then(response => {
              let postfeed = document.getElementById("postfeed")
              let image = document.createElement("IMG")
              image.src = response[4].image.url
              console.log(image)
              postfeed.appendChild(image)
          })
          .catch(() => console.log("error"));
    }
    return (
        <div id = "postfeed">
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