import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";

const UserPosts = (props) => {
    return (
        <div>
            {props.posts.length ? 
                <div>
                    {props.posts.map((el,i) => {
                    return (
                        <div className = "user-post" key = {"p" + i}>
                            <div>
                                <div className = "user-post-date">Posted {el.created_at}</div>
                                <NavLink className = "user-post-link selected-activities" to={`/post/${el.id}`}>{el.title}</NavLink>
                            </div>
                        </div>
                        )
                    })}
                </div> 
                : <div>No posts.</div>}
        </div>
    )
}


export default UserPosts;