import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";


const ShowPostData = (props) => {
//     <NavLink className = "text-link" to={`/board/${props.board.id}`}>
//     <div className = "post-board">b/{props.board.title}</div>
// </NavLink>
    if (props.data.image) {
        return (
        <div>
            <div className = "show-post-title">
                {props.data.title}
            </div>
            <div className = "show-post-meta">
                <span>Posted by  
                    <NavLink to={`/user/${props.userData.id}`}>
                        {" " + props.userData.username}
                    </NavLink>
                </span>
                <span> to b/
                     <NavLink to={`/board/${props.boardData.id}`}>
                        {props.boardData.title}
                    </NavLink>
                </span>
                <div>Posted on {props.data.created_at}</div>
            </div>
            <div className = "show-post-body">
                {props.data.body}
            </div>              
            <div>
                <img src = {props.data.image.url} width = {300} height = {300} />
            </div>
        </div>
        )
    } else {
        return (
        <div>
            <div className = "show-post-title">
                {props.data.title}
            </div>
            <div className = "show-post-meta">
            <span>Posted by 
                    <NavLink to={`/user/${props.userData.id}`}>
                        {" " + props.userData.username}
                    </NavLink>
                </span>
                <span> to b/
                     <NavLink to={`/board/${props.boardData.id}`}>
                        {props.boardData.title}
                    </NavLink>
                </span>
                <div>Posted on {props.data.created_at}</div>
            </div>
            <div className = "show-post-body">
                {props.data.body}
            </div>
        </div>
        )    
    }
}




export default ShowPostData;