import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

const ShowPostData = (props) => {
    const [editMessageData, setEditMessageData] = useState(null);
    const [editMessage, setEditMessage] = useState(false);
    console.log(editMessageData)

    useEffect(() => {
        setEditMessageData({...props.data})
    },[])

    const editPostText = () => {
        if (editMessageData) {
            setEditMessage("text");
        }
    }

    const handleEditMessage = (e) => {
        setEditMessageData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value
        }));
      }
    

    return (
        <div>
            <div>
                {editMessage === "text" ? <textarea name = "title" value = {editMessageData["title"]} onChange = {handleEditMessage}/> : <div  className = "show-post-title">{props.data.title}</div>}
            </div>
            <div className = "show-post-info">
                <span className = "show-post-board">
                    <NavLink className = "post-board-link" to={`/board/${props.data.board.id}`}> b/{props.data.board.title} </NavLink>
                </span>
                <span className = "show-post-user">
                    • posted by <NavLink className = "post-user-link" to={`/user/${props.data.user.id}`}> u/{props.data.user.username} </NavLink>
                </span>
                <span className = "show-post-date">
                   created on {props.data.created_at}
                </span>
            </div>
            <div>
                {editMessage === "text" ? <textarea name = "body" value = {editMessageData["body"]} onChange = {handleEditMessage}/> : <div className = "show-post-body">{props.data.body}</div>}
            </div>
            <button onClick = {editPostText}>Edit Post</button>
            {props.data.image ? 
                <div className = "show-post-image-container">
                    <img className = "show-post-image" src = {props.data.image.url} />
                </div>
                : props.formattedVideoLink ? 
                <div className = "show-post-video-container">
                    <iframe frameBorder="0" className = "show-post-video" width="850" height="480" src={props.formattedVideoLink} />
                    {editMessage === "text" ? <div><input name = "video_link" type = "text" value = {editMessageData["video_link"]} onChange = {handleEditMessage} /></div> : false}
                </div> 
                : false}
                {props.data ? 
                <div className = "d-flex align-items-center post-comments-likes">
                    <div className = "show-post-likes-count">
                        {props.currentUser ? (props.data.liking_users.some((ele) => ele.id === props.currentUser.id) && props.userLiked !== false)
                        ? 
                        <div className = "show-post-heart-btn" onClick = {props.unLikePost}>
                            <FontAwesomeIcon icon = {faHeart} /> {props.likedPost} Likes
                        </div> 
                        : 
                        <div className = "show-post-heart-btn" onClick = {props.likePost}>
                            <FontAwesomeIcon icon = {farHeart} /> {props.likedPost} Likes
                        </div>
                        : false}
                    </div>
                    <div className = "show-post-comments-count">
                        • {props.commentLength} Comments
                    </div>
                </div> : false}
        </div>
    )
}




export default ShowPostData;