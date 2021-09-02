import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

const ShowPostData = (props) => {

    return (
        <div>
            <div className = "show-post-title">
                {props.data.title}
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
            <div className = "show-post-body">
                {props.data.body}
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
                <div>
                    <div>
                        {props.currentUser ? (props.data.liking_users.some((ele) => ele.id === props.currentUser.id) && props.userLiked !== false)
                        ? 
                        <div onClick = {props.unLikePost}>
                            <FontAwesomeIcon icon = {faHeart} /> {props.likedPost} Likes
                        </div> 
                        : 
                        <div onClick = {props.likePost}>
                            <FontAwesomeIcon icon = {farHeart} /> {props.likedPost} Likes
                        </div>
                        : false}
                    </div>
                    <div></div>
                </div> : false}
        </div>
    )
}




export default ShowPostData;