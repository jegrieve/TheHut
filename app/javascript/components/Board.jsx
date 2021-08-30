import React from "react";
import { NavLink } from "react-router-dom";

const Board = (props) => {
    console.log(props.data)
    return (
        <div>
            <div className = "container">
                <div className = "row">
                    <div className = "col-sm-12 col-lg-8">
                        <div className = "show-board-title">{props.data.title}</div>
                        <div className = "board-create-data">Created by <NavLink className = "board-user-link" to={`/user/${props.data.user_id.id}`}>{props.data.user_id.username}</NavLink> • {props.data.created_at} </div>
                        <div className = "show-board-body">{props.data.body}</div>
                    </div>
                    <div className = "col-4 d-none d-lg-block">
                        {props.data.board_image ? 
                        <div>
                            <img className = "show-board-img" src = {props.data.board_image.url} />
                        </div> 
                        : false}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Board;