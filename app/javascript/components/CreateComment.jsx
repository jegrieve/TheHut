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
        <div>
            <form onSubmit = {submitCommentData}>
                <input onChange = {changeCommentData} type = "text" value = {props.createCommentData} />
                <button>Post</button>
            </form>
        </div>
    )
}

export default CreateComment;