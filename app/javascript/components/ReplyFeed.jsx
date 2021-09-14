import React, {useState, useEffect} from "react";
import CreateReply from "./CreateReply";
import CommentReply from "./CommentReply";

const ReplyFeed = (props) => {
    const [loadedReplies, setLoadedReplies] = useState([]); 
    const [replyLimit, setReplyLimit] = useState(10);
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

    //so i want to get the amount of comments, thats why i put the show replies/hide replies stuff here.
    return (
        <div>
            Show Reply and Hide reply stuff goes here.
            <CreateReply commentId = {props.commentData.id} currentUser = {props.currentUser}
            setReplyLimit = {setReplyLimit} replyLimit = {replyLimit} />
            {loadedReplies.map((el,i) => {
            return (
                <div className = "reply" key = {"r" + i}>
                    <CommentReply currentUser = {props.currentUser} data = {el} />
                </div>
            )
            })}
        </div>
    )
};


export default ReplyFeed;