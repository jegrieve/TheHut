import React from "react";


const Navbar = () => {

    const bringUpLogInForm = () => {console.log("hi")}
    const bringUpSignUpForm = () => {
        let formEl = document.createElement("div");
        formEl.id = "sign-up-form";
        document.querySelector(".site-navbar").appendChild(formEl)
    }
    return (
        //if not signed in:
        <div className = "site-navbar d-flex justify-content-around">
            <div>Website</div>
            <button onClick = {bringUpSignUpForm}>Sign Up</button>
            <button onClick = {bringUpLogInForm}>Log In</button>
        </div>
        //if signed in:
    //     <div className = "site-navbar d-flex justify-content-around">
    //     <div>Website</div>
    //     <div>account info</div>
    //     <div>Create post</div>
    // </div>
    )
};


export default Navbar;