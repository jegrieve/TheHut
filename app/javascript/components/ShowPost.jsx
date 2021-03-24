import React, {useEffect, useState} from "react";


const ShowPost = (props) => {
    const [postData, setPostData] = useState(null)

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

  if (postData) {
      return (
          <div>
              {postData.title}
          </div>
      )
  } else {
      return(
          <div>
              No post here :(
          </div>
      )
  }
}




export default ShowPost;