import React from "react";


const Navbar = () => {

    return (
        //if not signed in:
        <div className = "site-navbar d-flex justify-content-around">
            <div>Website</div>
            <div>Sign up</div>
            <div>Log In</div>
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