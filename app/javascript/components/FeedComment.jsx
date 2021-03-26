import React from "react";

const FeedComment = (props) => { 
    //get user obj and bring it here to link to
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