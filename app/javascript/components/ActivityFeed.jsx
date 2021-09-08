import React from "react";

const ActivityFeed = (props) => {
    return (
        <div>
            <div className = "activity-feed-title">ActivityFeed</div>
            <div className = "d-flex justify-content-center">
                <div className = "activity-feed-box">
                    <div className = "d-flex justify-content-around activity-feed-options">
                        <div>Posts</div>
                        <div>Comments</div>
                        <div>Likes</div>
                    </div>
                    <div>
                        Show the stuff here
                    </div>
                </div>
            </div>

        </div>
    )
}


export default ActivityFeed;