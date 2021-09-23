import React from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import UserOptions from "./UserOptions";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faUser } from '@fortawesome/free-solid-svg-icons'
import logo from 'images/TheHut-logo.png'

const Navbar = (props) => {
    return (
        <div className = "site-navbar d-flex justify-content-around align-items-center">
            <div className = "nav-logo">
                <NavLink to={`/`}><img className = "navbar-logo" src = {logo}/></NavLink>
            </div>
            {props.currentUser 
            ? <div className = "d-flex align-items-center navbar-user-controls justify-content-between">
                <div>
                    <NavLink to="/create-post">
                        <span className = "nav-create-post">
                        <FontAwesomeIcon icon={faPen} />
                        Create Post
                        </span>
                    </NavLink>
                </div>
                <div>
                    <NavLink to={`/user/${props.currentUser.id}`}>
                        <span className = "nav-user">
                            <FontAwesomeIcon icon={faUser} />
                            {props.currentUser.username}
                        </span>
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