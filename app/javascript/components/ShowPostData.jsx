import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

const ShowPostData = (props) => {
    const [editPostData, setEditPostData] = useState(null);
    const [editPost, setEditPost] = useState(false);
    console.log(editPostData)

    useEffect(() => {
        setEditPostData({...props.data})
    },[])

    useEffect(() => {
        if (editPost === "submitted") {
          props.submitEditPost(editPostData.id, editPostData);
        } else if (editPost === "submitted-image") {
          props.submitEditPostImage(editPostData.id, editPostData)
        } else if (editPost === "cancel") {
            setEditPostData({...props.data});
            setEditPost(false);
        }
      }, [editPost])

    const editPostText = () => {
        if (editPostData) {
            setEditPost("text");
        }
    }

    const handleEditPost = (e) => {
        setEditPostData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value
        }));
      }

    const submitEditPostData = (e) => {
        e.preventDefault();
        if (editPost === "text") {
            setEditPost("submitted");
        } else {
            setEditPost("submitted-image")
        }
      }

    const editPostImage = () => {
        if (editPostData) {
            setEditPost("image");
        }
    }

    const onImageChange = (e) => {
        setEditPostData((prev) => ({
            ...prev,
            image: e.target.files[0]
        }))
    };

    const cancelSubmit = () => {
        setEditPost("cancel")
    }

    if (editPost === "text") {
        return (
            <div>
                <form onSubmit = {submitEditPostData}>
                    <div>
                        <div className = "edit-title">Title</div>
                        <textarea id = "test" className = "show-post-title-edit" name = "title" value = {editPostData["title"]} 
                        onChange = {handleEditPost} minLength = {1} maxLength = {300} placeholder = "Title required" required/> 
                    </div>
                    <div>
                        <div className = "edit-title">Body</div>
                        <textarea className = "show-post-body-edit" name = "body" value = {editPostData["body"]} 
                        onChange = {handleEditPost} placeholder = "Body optional" maxLength = {10000} />
                    </div>
                    <div>
                        {props.data.video_link ? 
                            <div>
                                <div className = "edit-title">YouTube Link</div>
                                <input className = "show-post-video-edit" name = "video_link" type = "text" value = {editPostData["video_link"]} 
                                onChange = {handleEditPost} />
                            </div> 
                            : false}
                    </div>
                    <div className = "edit-btns">
                        <button className = "btn btn-success submit-btn">Submit</button>
                        <button className = "btn btn-danger cancel-btn" onClick = {cancelSubmit}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    } else if (editPost === "image") {
        return (
            <div>
                <form onSubmit = {submitEditPostData}>
                    <div>
                        <div className = "edit-title">Image</div>
                        <input name = "image" className = "form-control show-post-image-edit" type = "file" accept = "image/*" multiple = {false} onChange = {onImageChange} required/>
                        <div className = "edit-btns">
                            <button className = "btn btn-success submit-btn">Submit</button>
                            <button className = "btn btn-danger cancel-btn" onClick = {cancelSubmit}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    } else {
        return (
            <div>
                <div>
                    <div className = "show-post-title">{props.data.title}</div>
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
                    <div className = "show-post-body">{props.data.body}</div>
                </div>
                {props.data.image ? 
                    <div className = "show-post-image-container">
                        <img className = "show-post-image" src = {props.data.image.url} />
                    </div>
                    : props.formattedVideoLink ? 
                    <div className = "show-post-video-container">
                        <iframe frameBorder="0" className = "show-post-video" width="850" height="480" src={props.formattedVideoLink} />
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
                            • <span className = "edit-post-btn" onClick = {editPostText}> Edit Post </span>
                            {props.data.image ? <span>•<span className = "edit-post-btn" onClick = {editPostImage}> Edit Image </span></span> : false}
                        </div>
                    </div> : false}
            </div>
        )
    }

    
}




export default ShowPostData;