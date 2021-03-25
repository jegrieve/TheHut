import React from "react";

const FeedComment = (props) => { 
    return (
        <div>
            <div>User {props.user}</div>

            <div>
                {props.body}
            </div>
        </div>
    )
}

export default FeedComment;