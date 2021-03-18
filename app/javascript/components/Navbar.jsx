import React, {useState, useEffect} from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const Navbar = (props) => {
    return (
        <div className = "site-navbar d-flex justify-content-around">
            <div>Website</div>
            <SignUpForm setCurrentUser = {props.setCurrentUser} currentUser = {props.currentUser} />
            <SignInForm setCurrentUser = {props.setCurrentUser} currentUser = {props.currentUser} />
        </div>

    )
};


export default Navbar;