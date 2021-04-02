import React, {useEffect, useState} from "react";
import ShowPostData from "./ShowPostData";
import Loader from "react-loader-spinner";
import CreateComment from "./CreateComment"
import CommentFeed from "./CommentFeed"

const ShowPost = (props) => {
    const [postData, setPostData] = useState(null);
    const [likedPost, setLikedPost] = useState(false);

    useEffect(() => {
      if (props.currentUser && postData) {
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
      .then(response => setPostData(response))
      .catch(() => console.log("error"));
  }, [])

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


  if (likedPost) {
    if(postData) {
      return ( 
          <div>
              <ShowPostData data = {postData} />
              <button onClick = {unLikePost}>Unlike</button>
              <CreateComment params = {props.match.params.id} />
              <CommentFeed params = {props.match.params.id}  />
          </div>)
          
    } else {
        return (
            <div>
               <Loader type="Puff" color="#00BFFF" height={80} width={80} />
            </div>
        )
    }
  } else {
    if(postData) {
      return ( 
          <div>
              <ShowPostData data = {postData} />
              <button onClick = {likePost}>Like</button>
              <CreateComment params = {props.match.params.id} />
              <CommentFeed params = {props.match.params.id}  />
          </div>)
          
    } else {
        return (
            <div>
               <Loader type="Puff" color="#00BFFF" height={80} width={80} />
            </div>
        )
    }
  }
}




export default ShowPost;