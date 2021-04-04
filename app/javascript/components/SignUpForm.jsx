import React, {useState, useEffect} from "react";

const SignUpForm = (props) => {
    const [createUserInputs, setCreateUserInputs] = useState({
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
    });

    const bringUpSignUpForm = () => {
        document.querySelector(".sign-up-form").classList.remove("d-none");
        document.querySelector("body").classList.add("unclickable");
    }
    const exitSignUpForm = () => {
        document.querySelector(".sign-up-form").classList.add("d-none");
        document.querySelector("body").classList.remove("unclickable");
    }

    const submitSignUpForm = (e) => {
        e.preventDefault();
        const body = {
            email: createUserInputs["email"],
            username: createUserInputs["username"],
            password: createUserInputs["password"],
            password_confirmation: createUserInputs["passwordConfirm"],
        }
        const url = "api/v1/registrations/create"
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
            if (response.id) {
                exitSignUpForm();
                props.setCurrentUser(response)
            };
        })
        .catch(error => console.log(error.message))
    }

    const enterSignUpInputs = (e) => {
        setCreateUserInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <div>
            <button onClick = {bringUpSignUpForm}>Sign Up</button>
            <div className = "sign-up-form d-none clickable">
                <form onSubmit = {submitSignUpForm} className = "sign-up-inputs">
                    <div className = "form-group">
                    <label>Email:
                    <input className = "form-control" name = "email" type="email" onChange = {enterSignUpInputs} value = {createUserInputs["email"]} />
                    </label>
                    </div>
                    <div className = "form-group">
                    <label>Username:
                    <input className ="form-control" name = "username" type="text" onChange = {enterSignUpInputs} value = {createUserInputs["username"]}/>
                    </label>
                    </div>
                    <div className = "form-group">
                    <label>Password:
                    <input className ="form-control" name = "password" type="password" onChange = {enterSignUpInputs} value = {createUserInputs["password"]}/>
                    </label>
                    </div>
                    <div className = "form-group">
                    <label>Password Confirmation:
                    <input className = "form-control" name = "passwordConfirm" type="password" onChange = {enterSignUpInputs} value = {createUserInputs["passwordConfirm"]}/>
                    </label>
                    </div>
                    <div className = "sign-up-btn">
                        <button type = "submit">Create Account</button>
                    </div>
                    <div className = "sign-up-btn">
                        <button type = "button" onClick = {exitSignUpForm}>Exit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default SignUpForm;