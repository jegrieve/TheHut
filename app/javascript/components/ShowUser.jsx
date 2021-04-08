import React, {useState, useEffect} from "react";
import Loader from "react-loader-spinner";
import UserPosts from "./UserPosts";
import UserComments from "./UserComments";
import UserLikes from "./UserLikes";


const ShowUser = (props) => {
    const [userData, setUserData] = useState(null);

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

      if(userData) {
        return (
        <div>
          <div className = "container-fluid">
            <div className = "row">
              <div className = "user-info col-6">
                {userData.username}
                <div>Bio stuff will go here</div>
              </div>
              <div className = "user-avatar col-6">
                  <div>Avatar will go here</div>
              </div>
            </div>
              <div className = "row">
                <div className = "col-6">
                  <div className = "user-posts">
                    {userData.username}'s posts
                    <UserPosts posts = {userData.posts}/>
                  </div>
                </div>
                <div className = "col-6">
                  <UserComments comments = {userData.comments}/>
                </div>
                <div className = "col-6">
                  <UserLikes likedPosts = {userData.liked_posts}/>
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