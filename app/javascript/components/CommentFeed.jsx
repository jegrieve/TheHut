import React, {useState, useEffect} from "react";
import FeedComment from "./FeedComment"
import CreateComment from "./CreateComment"

const CommentFeed = (props) => { 
        const [loadedComments, setLoadedComments] = useState([]); 
        const [commentLimit, setCommentLimit] = useState(10);

        useEffect(() => {
            getComments();
        }, [])

        useEffect(() => {
            if (commentLimit > 10) {
                getComments();
            }
        }, [commentLimit])

        const getComments = () => {
            const url = `/api/v1/comments/index?id=${props.postId}&limit=${commentLimit}`;
            fetch(url)
              .then(response => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error("Network response was not ok.");
              })
              .then(response => {
                console.log(response);
                setLoadedComments(response);
              })
              .catch(() => console.log("error"));
        }

        return (
            <div>
                <CreateComment postId = {props.postId} setCommentLimit = {setCommentLimit} commentLimit = {commentLimit} />
                {loadedComments.length ? 
                <div>
                    {loadedComments.map((el,i) => {
                    return (
                        <div className = "comment" key = {i}>
                            <div>
                                <FeedComment data = {el}/>
                            </div>
                        </div>
                        )
                    })}            
                </div> 
                : <div>No Comments.</div>}
            </div>
        )

        //real quick remember props.params changed to props.postId
}

export default CommentFeed;
