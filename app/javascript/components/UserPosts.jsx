import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";

const UserPosts = (props) => {
    return (
        <div>
            <div>Posts:</div>
            {props.posts.length ? 
                <div>
                    {props.posts.map((el,i) => {
                    return (
                        <div className = "user-post" key = {"p" + i}>
                            <div>
                                <div>Posted {el.created_at}</div>
                                <NavLink to={`/post/${el.id}`}>{el.title}</NavLink>
                            </div>
                        </div>
                        )
                    })}
                </div> 
                : <div>No posts.</div>}
            <button className = "btn btn-secondary" onClick = {props.increaseActivityLimit}>Load More</button>
        </div>
    )
}


export default UserPosts;