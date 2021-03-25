import React, {useEffect, useState} from "react";
import ShowPostData from "./ShowPostData";
import Loader from "react-loader-spinner";
import CreateComment from "./CreateComment"
import CommentFeed from "./CommentFeed"

const ShowPost = (props) => {
    const [postData, setPostData] = useState(null);

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

  if(postData) {
    return ( 
        <div>
            <ShowPostData data = {postData} />
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




export default ShowPost;