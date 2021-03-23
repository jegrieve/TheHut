import React, {useState, useEffect} from "react";

const CreatePost = (props) => {
    const [postContent, setPostContent] = useState({
        title: '',
        body: '',
        image: null
    })

    const handleChange = (e) => {
        setPostContent((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const onImageChange = (e) => {
        setPostContent((prev) => ({
            ...prev,
            image: e.target.files[0]
        }))
    };

    const submitPostData = (e) => {
        e.preventDefault();
        const formData =  new FormData();
        formData.append('title', postContent["title"]);
        formData.append('body', postContent["body"]);
        formData.append('image', postContent["image"]);

        const url = "api/v1/posts/create"
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
        method: "POST",
        body: formData,
        headers: {
        "X-CSRF-Token": token, 
      },
    })
    // .then(renderPostData)
}

    const renderPostData = () => {
        //so you post data
        //then you request it back and display it
        //if its an error then you can update state
        //and it will say like error: post could not be made
        //the a link to return home
        //or after its created you create a new route
        //with this + the comment stuff etc.
        //probably do this instead.

        //so we post data
        //then we link to the new route which has
        //the post + place for comments.

        //have a button to click that will let you
        //post an image, otherwise send json
        //if you want to post an image send it
        //through formdata
        //that way we can have a null image

        //tonight
        //------
        //work on postfeed tonight
        //get it to display most recent 5 posts
        //option to load more undeer it
        //tommorow work on seeing individual posts
        //next 3 days
        //------
        //finally work on comments
        //then work on css/refactor
        //at end possibly add comunity options(subreddit)

                const {
                  match: {
                    params: { id }
                  }
                } = this.props;
                const url = `/api/v1/show/${id}`;
                fetch(url)
                  .then(response => {
                    if (response.ok) {
                      return response.json();
                    }
                    throw new Error("Network response was not ok.");
                  })
                  .then(response => this.setState({ recipe: response }))
                  .catch(() => this.props.history.push("/recipes"));
    }


    return (
        <div>
            <form onSubmit = {submitPostData}>
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
};

export default CreatePost;

{/* <input id="user-email" type="email" onChange = {enterSignUpInputs} value = {createUserInputs["email"]} /> */}
