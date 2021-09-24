import React, {useState, useEffect} from "react";
import FeedComment from "./FeedComment"
import CreateComment from "./CreateComment"

const CommentFeed = (props) => { 
        const [loadedComments, setLoadedComments] = useState([]); 
        const [commentLimit, setCommentLimit] = useState(5);
        const [createCommentData, setCreateCommentData] = useState("");
        useEffect(() => {
            getComments();
        }, [])

        useEffect(() => {
            if (commentLimit > 5) {
                getComments();
                setCreateCommentData("");
            }
        }, [commentLimit])

        useEffect(() => {
            if (createCommentData === "") {
                props.getCommentLength();
            }
        }, [createCommentData])

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
                setLoadedComments(response);
              })
              .catch(() => console.log("error"));
        }

        const getMoreComments = (e) => {
          e.target.style.visibility = "hidden";
          setTimeout(() => {
              e.target.style.visibility = "visible";
          }, 4000)
            setCommentLimit(commentLimit + 2);
        }

        const submitEditComment = (commentId, editCommentData) => {
            const body = {
              body: editCommentData["body"]
          }
            const url = `/api/v1/comments/update/${commentId}`;
            const token = document.querySelector('meta[name="csrf-token"]').content;
            fetch(url, {
            method: "PATCH",
            headers: {
            "X-CSRF-Token": token, 
            "Content-Type": "application/json"
          },
            body: JSON.stringify(body)
          })
          .then(response => {
              if (response.ok) {
                  return response.json()
              }
              throw new Error("Network response was not ok.");
          })
          .then(response => {
              getComments();
          })
          .catch(error => console.log(error.message))
          }

          const confirmDeleteComment= (commentId) => {
            const url = `/api/v1/comments/destroy/${commentId}`;
            const token = document.querySelector('meta[name="csrf-token"]').content;
          
            fetch(url, {
              method: "DELETE",
              headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
              }
            })
              .then(response => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error("Network response was not ok.");
              })
              .then((response) => {
                getComments();
              })
              .catch(error => console.log(error.message));
          }

        return (
            <div className = "comment-feed">
                <div className = "create-comment">
                  {props.currentUser ? <CreateComment postId = {props.postId} setCommentLimit = {setCommentLimit} commentLimit = {commentLimit} 
                    createCommentData = {createCommentData} setCreateCommentData = {setCreateCommentData}/> : <div><strong>Please Login/Signup to comment.</strong></div>}
                </div>
                {loadedComments.length ? 
                <div>
                    {loadedComments.map((el,i) => {
                    return (
                        <div className = "comment" key = {i}>
                            <div>
                                <FeedComment data = {el} currentUser = {props.currentUser} submitEditComment = {submitEditComment}
                                confirmDeleteComment = {confirmDeleteComment} />
                            </div>
                        </div>
                        )
                    })}
                    <div className = "load-more-comments-btn">
                      {loadedComments.length >= 5 ?
                        <button className = "btn btn-secondary" onClick = {getMoreComments}>Load more</button>            
                        : false}
                    </div>
                </div> 
                : <div>No Comments.</div>}
            </div>
        )
}

export default CommentFeed;
