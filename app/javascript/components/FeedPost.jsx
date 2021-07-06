import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
const FeedPost = (props) => { 
    const [likedPost, setLikedPost] = useState(false)
    const [videoLinkFormatted, setVideoLinkFormatted] = useState(null);
    useEffect(() => {
        if (props.currentUser && props.currentUser.liked_posts) {
            props.currentUser.liked_posts.forEach((el) => {
                if (el.id === props.postData.id) {setLikedPost(true)};
            })
        }
    }, [])

    useEffect(() => {
        if (props.postData.video_link) {
            setVideoLinkFormatted("https://www.youtube.com/embed/" + formatVideoUrl(props.postData.video_link))
        }
    },[])

    const formatVideoUrl = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
    
        return (match && match[2].length === 11)
          ? match[2]
          : null;
    }

    const likePost = () => {
        const body = {
            post_id: props.postData.id,
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
            const url = `/api/v1/likes/destroy/${props.postData.id}`;
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

    return (
        <div className = "feed-post">
        <NavLink className = "text-link" to={`/board/${props.postData.board.id}`}>
            <div className = "post-board"><span className = "underline">b/{props.postData.board.title}</span> • </div>
        </NavLink>
        <NavLink className = "text-link" to={`/user/${props.postData.user.id}`}>
            <div className = "post-user">posted by <span className = "underline">u/{props.postData.user.username}</span> • </div>
        </NavLink>
        <NavLink className = "text-link" to={`/post/${props.postData.id}`}>
            <div className = "post-created-at">post date {props.postData.created_at}</div>
            <div className = "post-title"><span className = "underline">{props.postData.title}</span></div>
            {props.postData.image ? <img className = "post-img" src = {props.postData.image.url}/> : false}
            {props.postData.video_link ? <iframe className = "feed-post-video" width="315" height="315" src={videoLinkFormatted} /> : false}
        </NavLink>
            {props.currentUser ? 
            <div>
                <div>
                    {likedPost ? 
                    <div className = "unlike-post-btn" onClick = {unLikePost}><FontAwesomeIcon icon={faHeart} /></div>
                    : <div className = "like-post-btn" onClick = {likePost}><FontAwesomeIcon icon={farHeart} /></div>}
                    {props.postData.liking_users.length} likes
                    </div>
                    <div>
                    {props.postData.comments.length} comments
                </div>
            </div>
            : 
            <div>Like button removed show heart+counts only</div>}
    </div>
    )
}

    


export default FeedPost;