import React, {useState, useEffect} from "react";
import Loader from "react-loader-spinner";

const CreatePost = (props) => {
    const [postContent, setPostContent] = useState({
        title: '',
        body: '',
        image: null,
        video: ''
    })
    const [submitType, setSubmitType] = useState('text')
    const [loadedBoards, setLoadedBoards] = useState([])
    const [selectBoardValue, setSelectBoardValue] = useState("")

    useEffect(() => {
        getBoards();
    }, [])

    const handleChange = (e) => {
        setPostContent((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleBoardChange = (e) => {
        setSelectBoardValue(e.target.value)
    }

    const onImageChange = (e) => {
        setPostContent((prev) => ({
            ...prev,
            image: e.target.files[0]
        }))
    };

    const getBoards = () => {
        const url = `/api/v1/boards/index`;
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
            setLoadedBoards(response)
          })
          .catch(() => console.log("error"));
    }

    const submitPostData = (e) => {
        e.preventDefault();
        if (submitType === "text") {
            submitWithTextData()
        } else if (submitType === "image") {
            submitWithImageData()
        } else {
            submitWithVideoData()
        }
}
    const submitWithImageData = () => {
        const formData =  new FormData();
        const board_id = selectBoardValue
        formData.append('title', postContent["title"]);
        formData.append('body', postContent["body"]);
        formData.append('image', postContent["image"]);
        const url = `api/v1/posts/create?board_id=${board_id}`
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
            renderPostData();
         } else {
            console.log("did not post")
         }
     })
    }

    const submitWithTextData = () => {
        const body = {
            title: postContent["title"],
            body: postContent["body"]
        }
        const url = `api/v1/posts/create?board_id=${selectBoardValue}`
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
            renderPostData();
        })
        .catch(error => console.log('did not post'))
    }

    const submitWithVideoData = () => {
        const body = {
            title: postContent["title"],
            body: postContent["body"],
            video: postContent["video"]
        }
        const url = `api/v1/posts/create?board_id=${selectBoardValue}`
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
            renderPostData();
        })
        .catch(error => console.log('did not post'))
    }

    const renderPostData = () => {
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
                props.history.push(`/post/${response.posts[response.posts.length - 1].id}`);
            })
              .catch(() => console.log("error"));
    }

    const showImageInput = () => {
        document.getElementById("image-input").classList.remove("d-none")
        document.getElementById("show-video-btn").classList.add("d-none")
        document.getElementById("show-image-btn").classList.add("d-none")
        setSubmitType("image")
    }

    const showVideoInput = () => {
        document.getElementById("video-input").classList.remove("d-none")
        document.getElementById("show-video-btn").classList.add("d-none")
        document.getElementById("show-image-btn").classList.add("d-none")
        setSubmitType("video")
    }

    if (loadedBoards) {
        return (
            <div className = "create-post-container d-flex justify-content-center">
                <form className = "create-post-form form-group" onSubmit = {submitPostData}>
                    <div className = "form-group">
                    <label for="select-board-value">Board</label>
                            <select id = "select-board-value" className = "form-control" name = "board" value = {selectBoardValue} onChange = {handleBoardChange}>
                            {loadedBoards.map((el,i) => {
                                return (
                                    <option key = {i} value = {el.id}>{el.title}</option>
                                )
                                    })}
                        </select>
                    </div>
                    <div className = "form-group">                            
                            <label for="post-title-value">Title</label>
                            <input className = "form-control" id = "post-title-value" name = "title" type = "text" onChange = {handleChange} value = {postContent["title"]} />
                    </div>
                    <div className = "form-group">
                    <label for="post-body-value">Body</label>
                            <textarea className = "form-control" id = "post-body-value" name = "body" type = "text" onChange = {handleChange} value = {postContent["body"]} rows = {3}/>
                    </div>

                        <div className = "form-group">
                            <input id = "image-input" className = "d-none form-control" type = "file" accept = "image/*" multiple = {false} onChange = {onImageChange} />
                        </div>
                        <div className = "form-group">
                            <input name = "video" id = "video-input" className = "d-none form-control" type = "text" value = {postContent["video"]} onChange = {handleChange} />
                        </div>
                            <button id = "show-image-btn" className = "btn btn-primary" type = "button" onClick = {showImageInput}>Add Image</button>
                            or
                            <button id = "show-video-btn" className = "btn btn-primary" type = "button" onClick = {showVideoInput}>Add Video</button>
                            <div>
                                <button className = "btn btn-success">Create Post</button>
                            </div>
                </form>
            </div>
        )
    } else {
        return (
            <Loader type="Puff" color="#00BFFF" height={80} width={80} />
        )
    }

};

export default CreatePost;
