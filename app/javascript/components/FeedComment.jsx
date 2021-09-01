import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

const FeedComment = (props) => { 

    return (
        <div>
            <div className = "comment-info d-flex align-items-center">
                {props.data.user.profile_img ? 
                <div>
                    <NavLink to = {`/user/${props.data.user.id}`}>
                        <img className = "comment-avatar-img" src = {props.data.user.user_img.url}/>
                    </NavLink> 
                </div> 
                : 
                <div className = "comment-avatar-fa">
                    <NavLink className = "comment-avatar-link" to = {`/user/${props.data.user.id}`}>
                        <FontAwesomeIcon icon={faUserCircle} />
                    </NavLink> 
                </div>}
                <div className = "comment-user">
                    <NavLink className = "comment-user-link" to={`/user/${props.data.user.id}`}> u/{props.data.user.username} </NavLink>
                </div>
                <div className = "show-post-date">
                    • {props.data.created_at}
                </div>
            </div>
            <div>
                {props.data.body}
            </div>
        </div>
    )
}

export default FeedComment;