import React, {useState, useEffect} from "react";

const CreateComment = (props) => { 
    const submitCommentData = (e) => {
        e.preventDefault();
        const body = {
            body: props.createCommentData,
        }
        const url = `/api/v1/comments/create/${props.postId}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
        method: "POST",
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
            props.setCommentLimit(props.commentLimit + 1)
        })
        .catch(error => console.log(error.message))
    }

    const changeCommentData = (e) => {
        props.setCreateCommentData(e.target.value);
    }

    return (
        <div className = "create-comment-data">
            <form className = "d-flex text-align-center" onSubmit = {submitCommentData}>
                <textarea className = "create-comment-input" onChange = {changeCommentData} type = "text" value = {props.createCommentData} rows = "2" minLength = {1} maxLength = {1000} placeholder = "Add a comment" />
                <button className = "btn btn-dark">Post</button>
            </form>
        </div>
    )
}

export default CreateComment;