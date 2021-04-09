import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";

const FeedPost = (props) => { 
    const [likedPost, setLikedPost] = useState(false)
    useEffect(() => {
        if (props.currentUser && props.currentUser.liked_posts) {
            props.currentUser.liked_posts.forEach((el) => {
                if (el.id === props.id) {setLikedPost(true)};
            })
        }
    }, [])

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

    if (!props.currentUser) {
        if (props.img) {
            return (
                <div className = "feed-post">
                    <NavLink className = "text-link" to={`/board/${props.board.id}`}>
                        <div className = "post-board">b/{props.board.title}</div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/user/${props.user.id}`}>
                        <div className = "post-user">posted by u/{props.user.username}</div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/post/${props.id}`}>
                        <div className = "post-created-at">post date {props.created_at}</div>
                        <div className = "post-title">{props.title}</div>
                        <img className = "post-img" src = {props.img.url}/>
                    </NavLink>
                        <div>Like button removed show heart+counts only</div>
                </div>
            )
        } else {
            return (
                <div className = "feed-post">
                    <NavLink className = "text-link" to={`/board/${props.board.id}`}>
                        <div className = "post-board">b/{props.board.title}</div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/user/${props.user.id}`}>
                        <div className = "post-user">posted by u/{props.user.username}</div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/post/${props.id}`}>
                        <div className = "post-created-at">post date {props.created_at}</div>
                        <div className = "post-title">{props.title}</div>
                    </NavLink>
                        <div>Like button removed show heart+counts only</div>
                </div>
            )
        }

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
                    <NavLink className = "text-link" to={`/board/${props.board.id}`}>
                        <div className = "post-board">b/{props.board.title}</div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/user/${props.user.id}`}>
                        <div className = "post-user">posted by u/{props.user.username}</div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/post/${props.id}`}>
                        <div className = "post-created-at">post date {props.created_at}</div>
                        <div className = "post-title">{props.title}</div>
                        <img className = "post-img" src = {props.img.url}/>
                    </NavLink>
                    <div>
                        <button onClick = {likePost}>Like</button>
                    </div>
                </div>
              );
        } else {
            return (
                <div className = "feed-post">
                    <NavLink className = "text-link" to={`/board/${props.board.id}`}>
                        <div className = "post-board">b/ {props.board.title}</div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/user/${props.user.id}`}>
                        <div className = "post-user">posted by u/{props.user.username}</div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/post/${props.id}`}>
                        <div className = "post-created-at">post date {props.created_at}</div>
                        <div className = "post-title">{props.title}</div>
                    </NavLink>
                    <div>
                        <button onClick = {likePost}>Like</button>
                    </div>
                </div>
            )
        }
    }
}

    


export default FeedPost;