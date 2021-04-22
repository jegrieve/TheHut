import React from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import UserOptions from "./UserOptions";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {

    return (
        <div className = "site-navbar d-flex justify-content-around align-items-center">
                <div>
                    <NavLink to="/">Website Logo</NavLink>
                </div>

            {props.currentUser 
            ? <div className = "d-flex navbar-user-controls justify-content-between">
                <div>
                    <NavLink to="/create-post">Create Post (+)</NavLink>
                </div>
                <div>
                    <NavLink to={`/user/${props.currentUser.id}`}>{props.currentUser.username}</NavLink>
                </div>
                <div>
                    <UserOptions setCurrentUser = {props.setCurrentUser} currentUser = {props.currentUser}/>
                </div>
              </div>
            : <div className = "d-flex navbar-user-controls justify-content-between signed-out">
                <div className = "non-opaque">
                    <SignUpForm setCurrentUser = {props.setCurrentUser} currentUser = {props.currentUser} />
                </div>
                <div>
                    <SignInForm setCurrentUser = {props.setCurrentUser} currentUser = {props.currentUser} />
                </div>
            </div>
            }
        </div>

    )
};


export default Navbar;