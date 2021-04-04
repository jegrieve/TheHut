import React, {useState, useEffect} from "react";


const FeedPost = (props) => { 
    const [likedPost, setLikedPost] = useState(false)
    useEffect(() => {
        if (props.currentUser && props.currentUser.liked_posts) {
            props.currentUser.liked_posts.forEach((el) => {
                if (el.id === props.id) {setLikedPost(true)};
            })
        }
    })

    const likePost = () => {
        const body = {
            post_id: props.id,
        }
        const url = '/api/v1/likes/create';
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
        method: "POST",
        headers: {
        "X-CSRF-Token": token, 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Network response was not ok.");
        })
        .then(response => {
            console.log(response)
            setLikedPost(true)
        })
        .catch(error => console.log(error.message))
    }

    const unLikePost = () => {
            const url = `/api/v1/likes/destroy/${props.id}`;
            const token = document.querySelector('meta[name="csrf-token"]').content;
        
            fetch(url, {
              method: "DELETE",
              headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
              }
            })
              .then(response => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error("Network response was not ok.");
              })
              .then((response) => {
                  console.log(response)
                  setLikedPost(false);
              })
              .catch(error => console.log(error.message));
    }
    
    if (likedPost) {
        return (
            <div>
                This post was liked
                <button onClick = {unLikePost}>Unlike</button>
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
                    <button onClick = {likePost}>Like</button>
                </div>
              );
        } else {
            return (
                <div className = "feed-post">
                    <div>{props.id}</div>
                    <div>{props.title}</div>
                    <div>{props.body}</div>
                    <button onClick = {likePost}>Like</button>
                </div>
            )
        }
    }
}

    


export default FeedPost;