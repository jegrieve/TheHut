import React, {useEffect, useState} from "react";


const ShowPostData = (props) => {
    if (props.data.image) {
        return (
        <div>
            <div>
                {props.data.title}
            </div>

            <div>
                {props.data.body}
            </div>
                                
            <div>
                <img src = {props.data.image.url} width = {300} height = {300} />
            </div>
        </div>
        )
    } else {
        return (
        <div>
            <div>
                {props.data.title}
            </div>
            <div>
                {props.data.body}
            </div>
        </div>
        )    
    }
}




export default ShowPostData;