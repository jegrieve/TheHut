import React, {useState, useEffect} from "react";


const FeedPost = (props) => { 
    const [likedPost, setLikedPost] = useState(false)
    useEffect(() => {
        if (props.currentUser) {
            props.currentUser.liked_posts.forEach((el) => {
                if (el.id === props.id) {setLikedPost(true)};
            })
        }
    })
    
    if (likedPost) {
        return (
            <div>
                This post was liked
            </div>
        )
    } else {
        if (props.img) {
            return (
                <div className = "feed-post">
                    <div>{props.id}</div>
                    <div>{props.title}</div>
                    <div>{props.body}</div>
                    <img src = {props.img.url} width = {30} height = {30} />
                    {/* <button onClick = {likePost}>Like</button> */}
                </div>
              );
        } else {
            return (
                <div className = "feed-post">
                    <div>{props.id}</div>
                    <div>{props.title}</div>
                    <div>{props.body}</div>
                    {/* <button onClick = {likePost}>Like</button> */}
                </div>
            )
        }
    }
}

    


export default FeedPost;