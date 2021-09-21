import React, {useState, useEffect} from "react";
import UserPosts from "./UserPosts";
import UserComments from "./UserComments";
import UserLikes from "./UserLikes";


const ActivityFeed = (props) => {
    const [activityLimit, setActivityLimit] = useState(10);
    const [selectedActivity, setSelectedActivity] = useState("posts");

    useEffect(() => {
        setActivityLimit(10);
    }, [selectedActivity])

    const handleActivityChange = (e) => {
        const element = e.target.id;
        let highlight = document.querySelector(".highlight")
        console.log(highlight)
        if (highlight) {
            highlight.classList.remove("highlight")
        }
        switch(element) {
          case 'activity-posts':
            setSelectedActivity("posts");
            document.getElementById('activity-posts').classList.add("highlight")
          break;
          case 'activity-comments':
            setSelectedActivity("comments");
            document.getElementById('activity-comments').classList.add("highlight")
          break;
          case 'activity-likes':
            setSelectedActivity("likes");
            document.getElementById('activity-likes').classList.add("highlight")
          break;
          default: 
          return;
        }
    }

    const increaseActivityLimit = () => {
        setActivityLimit(activityLimit + 5)
    }
    console.log(props.userData)
    return (
        <div>
            <div className = "activity-feed-title">Activity Feed</div>
            <div className = "d-flex justify-content-center">
                <div className = "activity-feed-box">
                    <div className = "d-flex justify-content-around activity-feed-options">
                        <div id = "activity-posts" className = "activity-options highlight" onClick = {handleActivityChange}>Posts</div>
                        <div id = "activity-comments" className = "activity-options" onClick = {handleActivityChange}>Comments</div>
                        <div id = "activity-likes" className = "activity-options" onClick = {handleActivityChange}>Likes</div>
                    </div>
                    <div>
                        {selectedActivity === "posts" ? 
                            <div><UserPosts activityLimit = {activityLimit} posts = {props.userData.posts.slice(0,activityLimit)} 
                            increaseActivityLimit = {increaseActivityLimit}/></div> 
                        : selectedActivity === "comments" ? 
                            <div><UserComments activityLimit = {activityLimit} comments = {props.userData.comments.slice(0,activityLimit)} 
                            increaseActivityLimit = {increaseActivityLimit}/></div> 
                        : 
                            <div><UserLikes activityLimit = {activityLimit} likes = {props.userData.liked_posts.slice(0,activityLimit)} 
                            increaseActivityLimit = {increaseActivityLimit}/></div>}
                    </div>
                </div>
            </div>
            <div className = "d-flex justify-content-center load-activity-btn">
                <button className = "btn btn-secondary" onClick = {increaseActivityLimit}>Load More</button>
            </div>
        </div>
    )
}


export default ActivityFeed;