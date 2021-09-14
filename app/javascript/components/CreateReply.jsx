import React, {useState, useEffect} from "react";

const CreateReply = (props) => { 
    const [createReplyData, setCreateReplyData] = useState("");

    const changeReplyData = (e) => {
        e.preventDefault();
        setCreateReplyData(e.target.value)
    }

    const submitReplyData  = (e) => {
        e.preventDefault();
        const body = {
            body: createReplyData
        }
        const url = `/api/v1/replies/create/${props.commentId}`; //need to put the comment id here
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
            props.setReplyLimit(props.replyLimit + 1)
            setCreateReplyData("");
        })
        .catch(error => console.log(error.message))
    }

    return (
        <div className = "create-comment-data  reply-style reply-input">
            <form className = "d-flex text-align-center" onSubmit = {submitReplyData}>
                <textarea className = "create-comment-input" onChange = {changeReplyData} type = "text" value = {props.createReplyData} rows = "2" minLength = {1} maxLength = {1000} placeholder = "Add a reply" />
                <button className = "btn btn-dark">Post</button>
            </form>
        </div>
    )
}

export default CreateReply;
