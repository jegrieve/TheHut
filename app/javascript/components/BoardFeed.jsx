import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";

const BoardFeed = () => {
    return (
        <div>
            <div>
            <NavLink to="/create-board">(+) Create a new board</NavLink>
            </div>
            {/*map through state and set navlink to boards */}
            <div>
                Board 1 {/*specific board will link to show*/}
            </div>
            <div>
                Board 2
            </div>
        </div>
        )
 }




export default BoardFeed;