import React from "react";

const PostFeed = () => {
    let placeholderPosts = ["post1","post2","post3","post4","post5"]
    return (
        <div>
        {placeholderPosts.map((el,i) => {
            return (
                <div className = "post" key = {i}>
                    {el}
                </div>
            )
        })}
        </div>
    )
}



export default PostFeed;