import React from "react";
import { NavLink } from "react-router-dom";

const UserLikes = (props) => {
    console.log(props)
    if (props.likedPosts && props.likedPosts.length > 0) {
        return (
            <div>
                {props.likedPosts.map((el,i) => {
                return (
                    <div className = "user-like" key = {i}>
                        <div>
                        Liked: <NavLink to={`/post/${el.id}`}> {el.title} </NavLink> 
                        </div>
                    </div>
                )
                })}
            </div>
        )
    } else {
        return (
            <div>User has not liked any posts.</div>
        )
    }

}


export default UserLikes;