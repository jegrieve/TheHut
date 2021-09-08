import React from "react";
import { NavLink } from "react-router-dom";

const UserComments = (props) => {
    return (
        <div>
            <div>Comments:</div>
            {props.comments.length ? 
                <div>
                    {props.comments.map((el,i) => {
                    return (
                        <div className = "user-comment" key = {"c" + i}>
                            <div>
                                <div>Commented {el.created_at}</div>
                                Made a comment on this
                                <NavLink to={`/post/${el.post_id}`}>post.</NavLink>
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


export default UserComments;