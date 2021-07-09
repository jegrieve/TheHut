import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";


const ShowPostData = (props) => {
    const [videoLinkFormatted, setVideoLinkFormatted] = useState(null);
//     <NavLink className = "text-link" to={`/board/${props.board.id}`}>
//     <div className = "post-board">b/{props.board.title}</div>
// </NavLink>

useEffect(() => {
    if (props.data.video_link) {
        setVideoLinkFormatted("https://www.youtube.com/embed/" + formatVideoUrl(props.data.video_link))
    }
},[])

const formatVideoUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
}

    return (
        <div>
            <div className = "show-post-title">
                {props.data.title}
            </div>  
            <div className = "show-post-meta">
                <span>Posted by  
                    <NavLink to={`/user/${props.userData.id}`}>
                        {" " + props.userData.username}
                    </NavLink>
                </span>
                <span> to b/
                     <NavLink to={`/board/${props.boardData.id}`}>
                        {props.boardData.title}
                    </NavLink>
                </span>
                <div>Posted on {props.data.created_at}</div>
            </div>
            <div className = "show-post-body">
                {props.data.body}
            </div> 
            {props.data.image ? 
            <div>
                <img src = {props.data.image.url} width = {300} height = {300} />
            </div> : false}             
            {videoLinkFormatted ? 
            <div>
                <iframe width="420" height="315" src={videoLinkFormatted} />
            </div>
             : false}
        </div>
    )
}




export default ShowPostData;