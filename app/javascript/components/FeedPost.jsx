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
                if (el.id === props.id) {setLikedPost(true)};
            })
        }
    }, [])

    useEffect(() => {
        if (props.video_link) {
            setVideoLinkFormatted("https://www.youtube.com/embed/" + formatVideoUrl(props.video_link))
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
                        <div className = "post-board"><span className = "underline">b/{props.board.title}</span> • </div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/user/${props.user.id}`}>
                        <div className = "post-user">posted by <span className = "underline">u/{props.user.username}</span> • </div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/post/${props.id}`}>
                        <div className = "post-created-at">post date {props.created_at}</div>
                        <div className = "post-title"><span className = "underline">{props.title}</span></div>
                        <img className = "post-img" src = {props.img.url}/>
                    </NavLink>
                        <div>Like button removed show heart+counts only</div>
                </div>
            )
        } else if (videoLinkFormatted) {
            return (
                <div className = "feed-post">
                    <NavLink className = "text-link" to={`/board/${props.board.id}`}>
                        <div className = "post-board"><span className = "underline">b/{props.board.title}</span> • </div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/user/${props.user.id}`}>
                        <div className = "post-user">posted by <span className = "underline">u/{props.user.username}</span> • </div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/post/${props.id}`}>
                        <div className = "post-created-at">post date {props.created_at}</div>
                        <div className = "post-title"><span className = "underline">{props.title}</span></div>
                        <iframe className = "feed-post-video" width="315" height="315" src={videoLinkFormatted} />
                    </NavLink>
                        <div>Like button removed show heart+counts only</div>
                </div>
            )
        } else {
            return (
                <div className = "feed-post">
                    <NavLink className = "text-link" to={`/board/${props.board.id}`}>
                        <div className = "post-board"><span className = "underline">b/{props.board.title}</span> • </div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/user/${props.user.id}`}>
                        <div className = "post-user">posted by <span className = "underline">u/{props.user.username}</span> • </div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/post/${props.id}`}>
                        <div className = "post-created-at">post date {props.created_at}</div>
                        <div className = "post-title"><span className = "underline">{props.title}</span></div>
                    </NavLink>
                        <div>Like button removed show heart+counts only</div>
                </div>
            )
        }
    }
    
        if (props.img) {
            return (
                <div className = "feed-post">
                    <NavLink className = "text-link" to={`/board/${props.board.id}`}>
                        <div className = "post-board"><span className = "underline">b/{props.board.title}</span> • </div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/user/${props.user.id}`}>
                        <div className = "post-user">posted by <span className = "underline">u/{props.user.username}</span> • </div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/post/${props.id}`}>
                        <div className = "post-created-at">post date {props.created_at}</div>
                        <div className = "post-title"><span className = "underline">{props.title}</span></div>
                        <img className = "post-img" src = {props.img.url}/>
                    </NavLink>
                    <div>
                        {likedPost ? 
                        <div className = "unlike-post-btn" onClick = {unLikePost}><FontAwesomeIcon icon={faHeart} /></div>
                        : <div className = "like-post-btn" onClick = {likePost}><FontAwesomeIcon icon={farHeart} /></div>}
                        {props.userLikes.length} likes
                    </div>
                    <div>
                        {props.userComments.length} comments
                    </div>
                </div>
              );
        } else if (videoLinkFormatted) {
            return (
                <div className = "feed-post">
                    <NavLink className = "text-link" to={`/board/${props.board.id}`}>
                        <div className = "post-board"><span className = "underline">b/{props.board.title}</span> • </div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/user/${props.user.id}`}>
                        <div className = "post-user">posted by <span className = "underline">u/{props.user.username}</span> • </div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/post/${props.id}`}>
                        <div className = "post-created-at">post date {props.created_at}</div>
                        <div className = "post-title"><span className = "underline">{props.title}</span></div>
                        <iframe className = "feed-post-video" width="315" height="315" src={videoLinkFormatted} />
                    </NavLink>
                    <div>
                        {likedPost ? 
                        <div className = "unlike-post-btn" onClick = {unLikePost}><FontAwesomeIcon icon={faHeart} /></div>
                        : <div className = "like-post-btn" onClick = {likePost}><FontAwesomeIcon icon={farHeart} /></div>}
                        {props.userLikes.length} likes
                    </div>
                    <div>
                        {props.userComments.length} comments
                    </div>
                </div>
            )
        } else {
            return (
                <div className = "feed-post">
                    <NavLink className = "text-link" to={`/board/${props.board.id}`}>
                        <div className = "post-board"><span className = "underline">b/{props.board.title}</span> • </div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/user/${props.user.id}`}>
                        <div className = "post-user">posted by <span className = "underline">u/{props.user.username}</span> • </div>
                    </NavLink>
                    <NavLink className = "text-link" to={`/post/${props.id}`}>
                        <div className = "post-created-at">post date {props.created_at}</div>
                        <div className = "post-title"><span className = "underline">{props.title}</span></div>
                    </NavLink>
                    <div>
                        {likedPost ? 
                        <div className = "unlike-post-btn" onClick = {unLikePost}><FontAwesomeIcon icon={faHeart} /></div>
                        : <div className = "like-post-btn" onClick = {likePost}><FontAwesomeIcon icon={farHeart} /></div>}
                        {props.userLikes.length} likes
                    </div>
                    <div>
                        {props.userComments.length} comments
                    </div>
                </div>
            )
        }
}

    


export default FeedPost;