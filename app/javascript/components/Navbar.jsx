import React, {useState, useEffect} from "react";
import SignUpForm from "./SignUpForm";

const Navbar = (props) => {
    const bringUpLogInForm = () => {console.log("test")}

    return (

        <div className = "site-navbar d-flex justify-content-around">
            <div>Website</div>
            <SignUpForm setCurrentUser = {props.setCurrentUser} currentUser = {props.currentUser} />
            <button onClick = {bringUpLogInForm}>Log In</button>
        </div>

    )
};


export default Navbar;