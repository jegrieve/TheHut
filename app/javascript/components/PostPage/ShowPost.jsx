import React, {useEffect, useState} from "react";
import ShowPostData from "./ShowPostData";
import Loader from "react-loader-spinner";
import CommentFeed from "./CommentFeed"

const ShowPost = (props) => {
    const [postData, setPostData] = useState(null);
    const [likedPost, setLikedPost] = useState(0);   
    const [userLiked, setUserLiked] = useState(null); 
    const [commentLength, setCommentLength] = useState(0);
    const [videoLinkFormatted, setVideoLinkFormatted] = useState(null);

    useEffect(() => {
      getPostData();
    }, [])

    useEffect(() => {
      getCommentLength();
    }, [])
    
    useEffect(() => {
        if (postData && postData.video_link) {
            setVideoLinkFormatted("https://www.youtube.com/embed/" + formatVideoUrl(postData.video_link))
        }
    },[postData])

    useEffect(() => {
      if (postData && likedPost === 0) {
        setLikedPost(postData.liking_users.length) 
      }
    }, [postData])

    useEffect(() => {
      if (userLiked === true) {
        setLikedPost(likedPost + 1)
      } else if (userLiked === false) {
        setLikedPost(likedPost - 1) 
      }
    }, [userLiked]);

    const getPostData = () => {
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
          setPostData(response)
        }
          )
        .catch(() => console.log("error"));
    }

    const formatVideoUrl = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
    
        return (match && match[2].length === 11)
          ? match[2]
          : null;
    }

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
        setUserLiked(true);
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
              setUserLiked(false);
            })
            .catch(error => console.log(error.message));
  }

  
  const getCommentLength = () => {
    const id = props.match.params.id
    const url = `/api/v1/comments/index?id=${id}&length=${true}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        setCommentLength(response.comment_length)
      })
      .catch(() => console.log("error"));
      }

      const submitEditPost = (postId, editPostData) => {
        const body = {
          title: editPostData["title"],
          body: editPostData["body"],
          video_link: editPostData["video_link"]
      }
        const url = `/api/v1/posts/update/${postId}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
        method: "PATCH",
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
          getPostData();
      })
      .catch(error => console.log(error.message))
      }

      const submitEditPostImage = (postId, editPostData) => {
        const formData =  new FormData();
        formData.append('image', editPostData["image"]);
        const url = `/api/v1/posts/update/${postId}?type=${"image"}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
        method: "PATCH",
        body: formData,
        headers: {
        "X-CSRF-Token": token, 
      },
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Network response was not ok.");
        })
        .then(response => {
            getPostData();
        })
        .catch(error => console.log(error.message))
      }

      
  const confirmDeletePost = (postId) => {
    const url = `/api/v1/posts/destroy/${postId}`;
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
        props.history.push("/");
      })
      .catch(error => console.log(error.message));
  }

    return (
      <div className = "postpage">
        <div className = "postpage-container container">
          <div className = "row">
            <div className = "col-lg-12">
              {postData ? 
              <ShowPostData  data = {postData} currentUser = {props.currentUser} formattedVideoLink = {videoLinkFormatted} 
              likedPost = {likedPost} likePost = {likePost} unLikePost = {unLikePost} userLiked = {userLiked} commentLength = {commentLength}
              submitEditPost = {submitEditPost} submitEditPostImage = {submitEditPostImage} confirmDeletePost = {confirmDeletePost} /> 
              : false}
            </div>
          </div>
          <hr></hr>
            <div className = "row"> 
              <div className = "col-lg-12">
                {postData ? <CommentFeed postId = {postData.id} getCommentLength = {getCommentLength} currentUser = {props.currentUser} /> : false}
              </div>
            </div>
          </div>
      </div>
    )
}




export default ShowPost;