import React, {useEffect, useState} from "react";
import ShowPostData from "./ShowPostData";
import Loader from "react-loader-spinner";
import CommentFeed from "./CommentFeed"

const ShowPost = (props) => {
    const [postData, setPostData] = useState(null);
    const [likedPost, setLikedPost] = useState(false);    
    const [videoLinkFormatted, setVideoLinkFormatted] = useState(null);

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
        if (!videoLinkFormatted && postData && postData.video_link) {
            setVideoLinkFormatted("https://www.youtube.com/embed/" + formatVideoUrl(postData.video_link))
        }
    },[postData])
    
    const formatVideoUrl = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
    
        return (match && match[2].length === 11)
          ? match[2]
          : null;
    }

    return (
      <div className = "postpage">
        <div className = "postpage-container container">
          <div className = "row">
            <div className = "col-lg-12">
              {postData ? 
              <ShowPostData  data = {postData} formattedVideoLink = {videoLinkFormatted}/> : false
              }
            </div>
          </div>
          <hr></hr>
            <div className = "row"> {/* comment stuff*/}
              <div className = "col-lg-12">
                Comment Stuff
              </div>
            </div>
          </div>
      </div>
    )
}




export default ShowPost;