import React from "react";
import { NavLink } from "react-router-dom";

const UserComments = (props) => {
    return (
        <div>
            {props.comments.map((el,i) => {
            if (i >= props.limit) return;
            return (
                <div className = "user-comment" key = {i}>
                    <div>
                    Commented: {el.body} on <NavLink to={`/post/${el.post_id}`}>this post.</NavLink>
                    </div>
                </div>
            )
            })}
        </div>
    )
}


export default UserComments;