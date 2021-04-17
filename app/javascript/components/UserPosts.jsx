import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";

const UserPosts = (props) => {
    const [loadedPosts, setLoadedPosts] = useState(null);
    const [loadedComments, setLoadedComments] = useState(null);

    return (
        <div>
        {props.posts.map((el,i) => {
            if (i >= props.limit) return;
            return (
                <div className = "user-post" key = {i}>
                    <div>
                    <NavLink to={`/post/${el.id}`}>{el.title}</NavLink>
                    </div>
                </div>
            )
            })}
        </div>
    )
}


export default UserPosts;