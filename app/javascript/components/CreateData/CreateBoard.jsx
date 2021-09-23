import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

const CreateBoard = (props) => { 
    const [boardContent, setBoardContent] = useState({
        title: '',
        body: '',
        image: null
    })
    const [submitType, setSubmitType] = useState('text')

    const handleChange = (e) => {
        setBoardContent((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const onImageChange = (e) => {
        setBoardContent((prev) => ({
            ...prev,
            image: e.target.files[0]
        }))
    };

    const submitBoardData = (e) => {
        e.preventDefault();
        if (submitType === "text") {
            submitWithTextData();
        } else {
            submitWithImageData();
        }
}

    const submitWithTextData = () => {
        const body = {
            title: boardContent["title"],
            body: boardContent["body"]
        }
        const url = "api/v1/boards/create"
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
        renderBoardData();
    })
    .catch(error => console.log('did not post'))
    }

    const submitWithImageData = () => {
        const formData =  new FormData();
        formData.append('title', boardContent["title"]);
        formData.append('body', boardContent["body"]);
        formData.append('board_image', boardContent["image"]);

        const url = "api/v1/boards/create"
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
        method: "POST",
        body: formData,
        headers: {
        "X-CSRF-Token": token, 
      },
    })
     .then(response => {
         if (response.ok) {
            renderBoardData();
         } else {
            console.log("did not post")
         }
     })
    }

const renderBoardData = () => {
    const id = props.currentUser.id
    const url = `/api/v1/users/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        props.history.push(`/board/${response.boards[response.boards.length - 1].id}`);
    })
      .catch(() => console.log("error"));
}

    const cancelInput = () => {
        setSubmitType("text")
    }

    const showImageInput = () => {
        setSubmitType("image")
    }

    return (
        <div>
            <div className = "create-title">Create Board</div>
            <div className = "d-flex justify-content-center">
                <form className = "create-board-form form-group create-form-container" onSubmit = {submitBoardData}>
                    <div className = "form-group">
                        <label className = "create-label" htmlFor="board-title-value">Title</label>
                        <input className = "form-control" id = "board-title-value" name = "title" type = "text" onChange = {handleChange} value = {boardContent["title"]} minLength = {4} maxLength = {21} placeholder = "Title required" required/>
                    </div>
                    <div className = "form-group">
                        <label className = "create-label" htmlFor="board-body-value">Info</label>
                        <textarea className = "form-control" id = "board-body-value" name = "body" type = "text" onChange = {handleChange} value = {boardContent["body"]} rows = {4} placeholder = "Describe the type of content found in this board" minLength = {6} maxLength = {100} required/>
                    </div>
                    {submitType === "image" ? 
                    <div className = "form-group">
                        <input className = "form-control" type = "file" accept = "image/*" multiple = {false} onChange = {onImageChange} required/>
                        <button className = "btn btn-danger cancel-btn" onClick = {cancelInput}>Cancel</button>
                    </div>
                    : 
                    <div>
                        <div className = "attachment-title">Add Board Image (optional)</div>
                        <div className = "add-post-attachment image-input-btn" onClick = {showImageInput}>
                            <FontAwesomeIcon icon={faImage} size = "2x" title = "Add Image"/>
                        </div>                
                    </div>}
                    <div className = "d-flex justify-content-center">
                        {props.currentUser ? 
                            <div>
                                <button className = "btn btn-success">Create Board</button>
                            </div> :
                        <div className = "unlogged-poster">Please Login/Signup to create a board.</div>}
                    </div>
                </form>
            </div>
        </div>
    )
}

    

export default CreateBoard;