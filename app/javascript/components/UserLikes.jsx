import React from "react";
import { NavLink } from "react-router-dom";

const UserLikes = (props) => {
    return (
        <div>
            {props.likes.length ? 
                <div>
                    {props.likes.map((el,i) => {
                    return (
                        <div className = "user-like" key = {"l" + i}>
                            <div>
                                <div className = "user-post-date">Liked {el.created_at}</div>
                                <NavLink className = "user-post-link" to={`/post/${el.id}`}>{el.title}</NavLink>
                            </div>
                        </div>
                        )
                    })}
                </div> 
                : <div>No comments.</div>}
        </div>
    )
}


export default UserLikes;