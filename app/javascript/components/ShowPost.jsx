import React, {useEffect, useState} from "react";
import ShowPostData from "./ShowPostData";
import Loader from "react-loader-spinner";
import CommentFeed from "./CommentFeed"

const ShowPost = (props) => {
    const [postData, setPostData] = useState(null);
    const [likedPost, setLikedPost] = useState(false);
    const [userData, setUserData] = useState(null);
    const [boardData, setBoardData] = useState(null);

    useEffect(() => {
      if (props.currentUser && postData && props.currentUser.liked_posts) {
          props.currentUser.liked_posts.forEach((el) => {
              if (el.id === postData.id) {setLikedPost(true)};
          })
      }
  })

  useEffect(() => {
    const id = props.match.params.id
    const url = `/api/v1/posts/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        console.log(response)
        setPostData(response)
      }
        )
      .catch(() => console.log("error"));
  }, [])

    useEffect(() => {
      if (postData) {
        const id = postData.user.id
        const url = `/api/v1/users/show/${id}`;
    
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
            setUserData(response)
        })
          .catch(() => console.log("error"));
      }
    },[postData])


    useEffect(() => {
      if (postData) {
        const id = postData.board.id
        const url = `/api/v1/boards/show/${id}`;
    
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => setBoardData(response))
          .catch(() => console.log("error"));
      }
    },[userData])

  const likePost = () => {
    const body = {
        post_id: postData.id,
    }
    const url = '/api/v1/likes/create';
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
        console.log(response)
        setLikedPost(true)
    })
    .catch(error => console.log(error.message))
}

const unLikePost = () => {
        const url = `/api/v1/likes/destroy/${postData.id}`;
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
              console.log(response)
              setLikedPost(false);
          })
          .catch(error => console.log(error.message));
}

//if user not signed in
  if (postData && !props.currentUser && userData && boardData) {
    return (
      <div className = "container">
          <div>
            <ShowPostData data = {postData} userData = {userData} boardData = {boardData}/>
            <div>
            Please Sign Up/Log In to post comments.
            <CommentFeed params = {props.match.params.id}  />
            </div>
        </div>
      </div>
    )
  }
//if use signed in
  if (likedPost) {
    if(postData && userData && boardData) {
      return ( 
          <div className = "container show-post">
            <div className = "row">
              <div className = "col-12 col-md-6">
                <ShowPostData data = {postData} userData = {userData} boardData = {boardData} />
                <button onClick = {unLikePost}>Unlike</button>
                {/* <CreateComment params = {props.match.params.id} /> */}
              </div>
              <div className = "col-12 col-md-6">
                <CommentFeed params = {props.match.params.id}  />
              </div>
            </div>
          </div>)
          
    } else {
        return (
            <div>
               <Loader type="Puff" color="#00BFFF" height={80} width={80} />
            </div>
        )
    }
  } else {
    if(postData && userData && boardData) {
      return ( 
          <div className = "container show-post">
            <div className = "row">
              <div className = "col-12 col-md-6">
                <ShowPostData data = {postData} userData = {userData} boardData = {boardData} />
                <button onClick = {likePost}>Like</button>
                {/* <CreateComment params = {props.match.params.id} /> */}
              </div>
              <div className = "col-12 col-md-6">
                <CommentFeed params = {props.match.params.id}  />
              </div>
            </div>
          </div>)
          
    } else {
        return (
            <div className = "container show-post">
               <Loader type="Puff" color="#00BFFF" height={80} width={80} />
            </div>
        )
    }
  }
}




export default ShowPost;