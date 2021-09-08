import React from "react";
import { NavLink } from "react-router-dom";

const UserLikes = (props) => {
    return (
        <div>
            <div>Likes:</div>
            {props.likes.length ? 
                <div>
                    {props.likes.map((el,i) => {
                    return (
                        <div className = "user-like" key = {"l" + i}>
                            <div>
                                <div>Liked on {el.created_at}</div>
                                Liked this
                                <NavLink to={`/post/${el.id}`}>post.</NavLink>
                            </div>
                        </div>
                        )
                    })}
                </div> 
                : <div>No comments.</div>}
            <button className = "btn btn-secondary" onClick = {props.increaseActivityLimit}>Load More</button>
        </div>
    )
}


export default UserLikes;