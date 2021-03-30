import React, {useState, useEffect} from "react";
import Loader from "react-loader-spinner";

const CreatePost = (props) => {
    const [postContent, setPostContent] = useState({
        title: '',
        body: '',
        image: null
    })
    const [loadedContent, setLoadedContent] = useState(null)
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
        const formData =  new FormData();
        const board_id = selectBoardValue
        console.log(board_id)
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

    if (loadedBoards) {
        //once that is done, get a fetch on the show
        //page of the board.
        return (
            <div>
                <form onSubmit = {submitPostData}>
                    <label>Board:
                        <select name = "board" value = {selectBoardValue} onChange = {handleBoardChange}>
                        {loadedBoards.map((el,i) => {
                    return (
                        <option key = {i} value = {el.id}>{el.title}</option>
                    )
                    })}
                        </select>

                    </label>
                    <label>Title:
                    <input name = "title" type = "text" onChange = {handleChange} value = {postContent["title"]} />
                    </label>
                    <label>Body:
                    <input name = "body" type = "text" onChange = {handleChange} value = {postContent["body"]}/>
                    </label>
                    <label>Image:
                    <input type = "file" accept = "image/*" multiple = {false} onChange = {onImageChange} />
                    </label>
                    <button>Create Post</button>
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
