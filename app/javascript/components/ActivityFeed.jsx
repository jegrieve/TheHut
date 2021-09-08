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
        switch(element) {
          case 'activity-posts':
            setSelectedActivity("posts");
          break;
          case 'activity-comments':
            setSelectedActivity("comments");
          break;
          case 'activity-likes':
            setSelectedActivity("likes");
          break;
          default: 
          return;
        }
    }

    const increaseActivityLimit = () => {
        setActivityLimit(activityLimit + 5)
    }

    return (
        <div>
            <div className = "activity-feed-title">Activity Feed</div>
            <div className = "d-flex justify-content-center">
                <div className = "activity-feed-box">
                    <div className = "d-flex justify-content-around activity-feed-options">
                        <div id = "activity-posts" className = "activity-options" onClick = {handleActivityChange}>Posts</div>
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

        </div>
    )
}


export default ActivityFeed;