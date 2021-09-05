import React, {useState, useEffect} from "react";
import UserInfo from "./UserInfo";
import ActivityFeed from "./ActivityFeed";


const ShowUser = (props) => {
    const [userData, setUserData] = useState(null);
    console.log(userData)

    useEffect(() => {
      getUserData();
    }, [])

    const getUserData = () => {
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
          setUserData(response)
      })
        .catch(() => console.log("error"));
    }


    const updateProfileImage = (userId, imageData) => { 
      const formData =  new FormData();
      formData.append('profile_image', imageData["image"]);
      const url = `/api/v1/users/update/${userId}`;
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
        getUserData();
      })
      .catch(error => console.log(error.message))
    }


    return(
      <div>
        <div className = "container-fluid">
          <div className = "row">
            <div className = "col-6">
              {userData ? 
                <UserInfo userData = {userData} updateProfileImage = {updateProfileImage} /> : 
                false}
            </div>
            <div className = "col-6">
              {userData ? 
                <ActivityFeed userData = {userData} /> :
                false}
            </div>
          </div>
        </div>
      </div>
    )

    //create a component for activity feed, but i can put all the stuff here. Also, create a component for the user stuff, can put the stuff here
    //aswell.
}



export default ShowUser;
