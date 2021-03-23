import React from "react";

const FeedPost = (props) => { 
    if (props.img) {
        return (
            <div className = "feed-post">
                <div>{props.id}</div>
                <div>{props.title}</div>
                <div>{props.body}</div>
                <img src = {props.img.url} width = {30} height = {30} />
            </div>
          );
    } else {
        return (
            <div className = "feed-post">
                <div>{props.id}</div>
                <div>{props.title}</div>
                <div>{props.body}</div>
            </div>
        )
    }
}

    


export default FeedPost;