import React, {useState, useEffect} from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import UserOptions from "./UserOptions";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
    return (
        <div className = "site-navbar d-flex justify-content-around">
            <div>Website</div>
            {props.currentUser 
            ? <div>
                <UserOptions setCurrentUser = {props.setCurrentUser} currentUser = {props.currentUser}/>
                <NavLink to="/create-post">Create Post (+)</NavLink>
                <NavLink to={`/user/${props.currentUser.id}`}>Current User</NavLink>
              </div>
            : <div>
            <SignUpForm setCurrentUser = {props.setCurrentUser} currentUser = {props.currentUser} />
            <SignInForm setCurrentUser = {props.setCurrentUser} currentUser = {props.currentUser} />
            </div>
            }
        </div>

    )
};


export default Navbar;