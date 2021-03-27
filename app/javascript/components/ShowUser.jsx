import React, {useState, useEffect} from "react";
import Loader from "react-loader-spinner";
import UserPosts from "./UserPosts";
import UserComments from "./UserComments";


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
            <div>
                {userData.username}
            </div>
            <div className = "container-fluid">
             <div className = "row">
                <div className = "col-6">
                <UserPosts posts = {userData.posts}/>
                </div>

                <div className = "col-6">
                <UserComments comments = {userData.comments}/>
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