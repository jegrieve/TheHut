import React, {useState, useEffect} from "react";

const CreateBoard = (props) => { 
    const [boardContent, setBoardContent] = useState({
        title: '',
        body: '',
        image: null
    })

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
        const formData =  new FormData();
        formData.append('title', boardContent["title"]);
        formData.append('body', boardContent["body"]);
        formData.append('image', boardContent["image"]);

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
            console.log(response)
         } else {
            console.log("did not post")
         }
     })
}


    return (
        <div>
            <form onSubmit = {submitBoardData}>
                <label>Title:
                <input name = "title" type = "text" onChange = {handleChange} value = {boardContent["title"]} />
                </label>
                <label>Body:
                <input name = "body" type = "text" onChange = {handleChange} value = {boardContent["body"]}/>
                </label>
                <label>Image:
                <input type = "file" accept = "image/*" multiple = {false} onChange = {onImageChange} />
                </label>
                <button>Create Board</button>
            </form>
        </div>
    )
}

    

export default CreateBoard;