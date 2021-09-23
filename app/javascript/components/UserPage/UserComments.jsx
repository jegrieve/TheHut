import React from "react";
import { NavLink } from "react-router-dom";

const UserComments = (props) => {
    return (
        <div>
            {props.comments.length ? 
                <div>
                    {props.comments.map((el,i) => {
                    return (
                        <div className = "user-comment" key = {"c" + i}>
                            <div className = "user-post-date">Commented {el.created_at}</div>
                            {el.body.length <= 300 ? 
                            <NavLink className = "user-post-link selected-activities" to={`/post/${el.post.id}`}>{el.body}</NavLink> :
                            <NavLink className = "user-post-link" to={`/post/${el.post.id}`}>Long comment here.</NavLink> }
                        </div>
                        )
                    })}
                </div> 
                : <div>No comments.</div>}
        </div>
    )
}

export default UserComments;