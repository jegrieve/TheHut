import React, {useState, useEffect} from "react";
import Loader from "react-loader-spinner";
import UserPosts from "./UserPosts";
import UserComments from "./UserComments";
import UserLikes from "./UserLikes";


const ShowUser = (props) => {
    const [userData, setUserData] = useState(null);
    const [postLimit, setPostLimit] = useState(10);
    const [commentLimit, setCommentLimit] = useState(10);
    const [likeLimit, setLikeLimit] = useState(10);

    useEffect(() => {
        const id = props.match.params.id
        const url = `/api/v1/users/show/${id}`;
    
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
            console.log(response)
            setUserData(response)
        })
          .catch(() => console.log("error"));
      }, []);

      const updateLimit = (e) => {
        const element = e.target.id;
        switch(element) {
          case 'post-limit':
            setPostLimit(postLimit + 5)
          break;
          case 'like-limit':
            setLikeLimit(likeLimit + 5)
          break;
          case 'comment-limit':
            setCommentLimit(commentLimit + 5)
          break;
          default: 
          return;
        }
      }

      if(userData) {
        return (
        <div>
         <div className = "container-fluid">
          <div className = "show-user-info">
            <div className = "row">
               <div className = "col-12 d-flex justify-content-center">
                  <div className = "user-avatar">Avatar will go here</div> {/*this will be img instead*/}
              </div>
            </div>
            <div className = "row">
              <div className = "user-username col-12">
                {userData.username}
              </div>
              </div>
              <div className = "row">
               <div className = "user-bio col-12">
                <div>Bio stuff will go here</div>
               </div>
              </div>
            </div>
            <hr/>
              <div className = "row">
                  <div className = "col-12">
                    Recent Activity:
                  </div>
              </div>
              <div className = "row user-activity">
                <div className = "col-4">
                  <div className = "user-posts">
                    {userData.username}'s posts
                    <UserPosts posts = {userData.posts} setPostLimit = {setPostLimit} limit = {postLimit}/>
                    <button id = "post-limit" onClick = {updateLimit}>Show More</button>
                  </div>
                </div>
                <div className = "col-4">
                  <UserComments comments = {userData.comments} setCommentLimit = {setCommentLimit} limit = {commentLimit}/>
                  <button id = "comment-limit" onClick = {updateLimit}>Show More</button>
                </div>
                <div className = "col-4">
                  <UserLikes likedPosts = {userData.liked_posts} setLikeLimit = {setLikeLimit} limit = {likeLimit}/>
                  <button id = "like-limit" onClick = {updateLimit}>Show More</button> 
                </div>
            </div>
          </div>
        </div>
        )
      } else {
        return (
            <div>
               <Loader type="Puff" color="#00BFFF" height={80} width={80} />
            </div>
        )
      }

}



export default ShowUser;
