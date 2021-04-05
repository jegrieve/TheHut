import React, {useState, useEffect} from "react";

const SignInForm = (props) => {
    const [signInUserInputs, setSignInUserInputs] = useState({
        username: "",
        password: "",
    });

    const bringUpSignInForm = () => {
        document.querySelector(".sign-in-form").classList.remove("d-none");
    }
    const exitSignInForm = () => {
        document.querySelector(".sign-in-form").classList.add("d-none");
    }

    const submitSignInForm = (e) => {
        e.preventDefault();
        const body = {
            username: signInUserInputs["username"],
            password: signInUserInputs["password"],
        }
        const url = "api/v1/sessions/create"
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
            <button onClick = {bringUpSignInForm}>Log In</button>
            <div className = "sign-in-form d-none">
                <form className = "sign-in-inputs">
                    <div className = "form-group">
                    <label>Username:
                    <small id="signin-usernameHelp" className="form-text red-text"></small>
                    <input id="sign-in-user-username" name = "username" type="text" className = "form-control" onChange = {enterSignInInputs} value = {signInUserInputs["username"]}/>
                    </label>
                    </div>
                    <div className = "form-group">
                    <label>Password:
                    <input id="sign-in-user-password" name = "password" className = "form-control" type="password" onChange = {enterSignInInputs} value = {signInUserInputs["password"]}/>
                    </label>
                    </div>
                    <div className = "sign-in-btn">
                    <button type = "submit" onClick = {submitSignInForm}>Log In</button>
                    </div>
                    <div className = "sign-in-btn">
                    <button type = "button" onClick = {exitSignInForm}>Exit</button>
                    </div>
                </form>
            </div>

        </div>
    )
}



export default SignInForm;