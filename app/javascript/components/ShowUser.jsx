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
              <div className = "row">
                <div className = "col-4">
                  <div className = "user-posts">
                    {userData.username}'s posts
                    <UserPosts posts = {userData.posts}/>
                  </div>
                </div>
                <div className = "col-4">
                  <UserComments comments = {userData.comments}/>
                </div>
                <div className = "col-4">
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