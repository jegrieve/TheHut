import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const SignInForm = (props) => {
    const [signInUserInputs, setSignInUserInputs] = useState({
        username: "",
        password: "",
    });

    const bringUpSignInForm = () => {
        document.querySelector(".sign-in-form").classList.remove("d-none");
        document.querySelector("body").classList.add("unclickable");
    }
    const exitSignInForm = () => {
        document.querySelector(".sign-in-form").classList.add("d-none");
        document.querySelector("body").classList.remove("unclickable");
    }

    const submitSignInForm = (e) => {
        e.preventDefault();
        const body = {
            username: signInUserInputs["username"],
            password: signInUserInputs["password"],
        }
        const url = "/api/v1/sessions/create"
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
        method: "POST",
        headers: {
        "X-CSRF-Token": token, 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Network response was not ok.");
        })
        .then(response => {
            if (response === null) {
                signInErrorHandling();
            } else if (response.id) {
                exitSignInForm();
                props.setCurrentUser(response)
            };
        })
        .catch(error => console.log(error.message))
    }

    const signInErrorHandling = () => {
        document.getElementById("signin-usernameHelp").innerHTML = "Invalid User/Pass"
        document.getElementById("sign-in-user-username").classList.add("is-invalid")
        document.getElementById("sign-in-user-password").classList.add("is-invalid")
    }

    const enterSignInInputs = (e) => {
        setSignInUserInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <div>
            <button className = "btn btn-secondary" onClick = {bringUpSignInForm}>Log In</button>
            <div className = "sign-in-form d-none clickable">
                <form className = "sign-in-inputs">
                    <div>
                        <span className = "sign-in-title">Login</span>
                        <span onClick = {exitSignInForm} type="button" className="close close-btn-container" aria-label="Close">
                            <FontAwesomeIcon icon={faTimes} />
                            {/* <span className="close-btn" aria-hidden="true">&times;</span> */}
                        </span>
                    </div>
                    <div className = "form-group sign-in-username-input">
                        <label className = "sign-in-label">Username:
                            <small id="signin-usernameHelp" className="form-text red-text"></small>
                            <input id="sign-in-user-username" name = "username" type="text" className = "form-control" onChange = {enterSignInInputs} value = {signInUserInputs["username"]}/>
                         </label>
                    </div>
                    <div className = "form-group sign-in-username-password">
                        <label className = "sign-in-label">Password:
                        <input id="sign-in-user-password" name = "password" className = "form-control" type="password" onChange = {enterSignInInputs} value = {signInUserInputs["password"]}/>
                    </label>
                    </div>
                    <div className = "sign-in-btn">
                        <button className = "btn btn-success" type = "submit" onClick = {submitSignInForm}>Log In</button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default SignInForm;