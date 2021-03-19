import React, {useState, useEffect} from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import UserOptions from "./UserOptions"

const Navbar = (props) => {
    return (
        <div className = "site-navbar d-flex justify-content-around">
            <div>Website</div>
            {props.currentUser 
            ? <UserOptions setCurrentUser = {props.setCurrentUser} currentUser = {props.currentUser}/>
            : <div>
            <SignUpForm setCurrentUser = {props.setCurrentUser} currentUser = {props.currentUser} />
            <SignInForm setCurrentUser = {props.setCurrentUser} currentUser = {props.currentUser} />
            </div>
            }
        </div>

    )
};


export default Navbar;