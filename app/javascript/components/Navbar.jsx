import React from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import UserOptions from "./UserOptions";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faUser } from '@fortawesome/free-solid-svg-icons'

const Navbar = (props) => {

    return (
        <div className = "site-navbar d-flex justify-content-around align-items-center">
                <div>
                    <NavLink to="/">Website Logo</NavLink>
                </div>

            {props.currentUser 
            ? <div className = "d-flex align-items-center navbar-user-controls justify-content-between">
                <div>
                    <NavLink to="/create-post">
                    <FontAwesomeIcon icon={faPen} />
                    Create Post
                    </NavLink>
                </div>
                <div>
                    <NavLink to={`/user/${props.currentUser.id}`}>
                        <FontAwesomeIcon icon={faUser} />
                        {props.currentUser.username}
                    </NavLink>
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