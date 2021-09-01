import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
const FeedPost = (props) => { 
    const [likedPost, setLikedPost] = useState(null)
    const [videoLinkFormatted, setVideoLinkFormatted] = useState(null);

    useEffect(() => {
        if (likedPost !== props.likedPost) {
            setLikedPost(props.likedPost);
        }
    }) 

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
            props.getPosts();
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
                props.getPosts();
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
            <div className = "post-created-at">posted on {props.postData.created_at}</div>
            <div className = "post-title"><span className = "underline">{props.postData.title}</span></div>
            {props.postData.image ? <img className = "post-img" src = {props.postData.image.url}/> : false}
            {props.postData.video_link ? <iframe frameBorder="0" className = "feed-post-video" width="315" height="315" src={videoLinkFormatted} /> : false}
        </NavLink>
            {props.currentUser ? 
            <div>
                <div className = "d-flex align-items-center">
                    {likedPost === true ? 
                    <div className = "unlike-post-btn" onClick = {unLikePost}>
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    : likedPost === false ? 
                    <div className = "like-post-btn" onClick = {likePost}>
                        <FontAwesomeIcon icon={farHeart} />
                    </div>
                    : false}
                    <div className = "post-likes-count">
                        {props.postData.liking_users.length} likes
                    </div>
                    <div className = "post-comments-count">
                        {props.postData.comments.length} comments
                    </div>
                   </div>
                  <div>
                </div>
            </div>
            : 
            <div>
                <div className = "d-flex align-items-center">
                    <div className = "not-signed-in-btn">
                        <FontAwesomeIcon icon={farHeart} />
                    </div>
                    <div className = "post-likes-count">
                        {props.postData.liking_users.length} likes
                    </div>
                    <div className = "post-comments-count">
                        {props.postData.comments.length} comments
                    </div>
                </div>
            </div>}
    </div>
    )
}

    


export default FeedPost;