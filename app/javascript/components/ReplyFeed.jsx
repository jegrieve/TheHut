import React, {useState, useEffect} from "react";
import CreateReply from "./CreateReply";
import CommentReply from "./CommentReply";

const ReplyFeed = (props) => {
    const [loadedReplies, setLoadedReplies] = useState([]); 
    const [replyLimit, setReplyLimit] = useState(10);
    const [viewReplies, setViewReplies] = useState(false);
    const [createNewReply, setCreateNewReply] = useState(false);
    console.log(loadedReplies)
    useEffect(() => {
        getReplies();
    },[])

    useEffect(() => {
        getReplies();
    }, [replyLimit])

    const getReplies = () => {
        const url = `/api/v1/replies/index?id=${props.commentData.id}&limit=${replyLimit}`;
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
            setLoadedReplies(response);
          })
          .catch(() => console.log("error"));
    }

    const toggleReplies = () => {
        setViewReplies(!viewReplies)
    }

    const toggleCreateReply = () => {
        setCreateNewReply(!createNewReply)
    }

    return (
        <div>
            {createNewReply ? 
                <div>
                    <CreateReply commentId = {props.commentData.id} currentUser = {props.currentUser}
                    setReplyLimit = {setReplyLimit} replyLimit = {replyLimit} />
                    <div>
                        <div onClick = {toggleCreateReply}>Cancel</div>
                    </div>
                </div> : 
                <div>
                    <div onClick = {toggleCreateReply}>Reply</div>
                </div>}

            {viewReplies ? 
            <div>
                <div onClick = {toggleReplies}>hide replies</div>
                {loadedReplies.map((el,i) => {
                return (
                    <div className = "reply" key = {"r" + i}>
                        <CommentReply currentUser = {props.currentUser} data = {el} />
                    </div>
                    )
                })}
            </div> 
            :
            <div>
                <div onClick = {toggleReplies}>view replies</div>
            </div>}
        </div>
    )
};


export default ReplyFeed;