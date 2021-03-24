import React, {useEffect, useState} from "react";


const ShowPost = (props) => {
    return (
        <div>
            {props.match.params.id}
        </div>
    )
}




export default ShowPost;