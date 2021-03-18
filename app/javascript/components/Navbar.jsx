import React, {useState, useEffect} from "react";



const Navbar = () => {
    const [createUserInputs, setCreateUserInputs] = useState({
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
    });

    const enterSignUpInputs = (e) => {
            switch (e.target.id) {
              case 'user-email':
                setCreateUserInputs(ps => ({
                    ...ps,
                    email: e.target.value,
                }));
                break;
              case 'user-username':
                setCreateUserInputs(ps => ({
                    ...ps,
                    username: e.target.value,
                }));
                break;
              case 'user-password':
                setCreateUserInputs(ps => ({
                    ...ps,
                    password: e.target.value,
                }));
                break;
            case 'user-password-confirmation':
                setCreateUserInputs(ps => ({
                    ...ps,
                    passwordConfirm: e.target.value,
                }));
                break;
              default:
                return;
            }
          };
          
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
        .then(response => console.log(response))
        .catch(error => console.log(error.message))
    }

    const bringUpLogInForm = () => {console.log("test")}
    const bringUpSignUpForm = () => {
        document.querySelector(".sign-up-form").classList.remove("d-none");
    }
    return (
        //add state to the input forms
        //if not signed in:
        <div className = "site-navbar d-flex justify-content-around">
            <div>Website</div>
            <button onClick = {bringUpSignUpForm}>Sign Up</button>
            <button onClick = {bringUpLogInForm}>Log In</button>
            <form className = "sign-up-form d-none">
                <label>Email:
                <input id="user-email" type="email" onChange = {enterSignUpInputs} value = {createUserInputs["email"]} />
                </label>
                <label>Username:
                <input id="user-username" type="text" onChange = {enterSignUpInputs} value = {createUserInputs["username"]}/>
                </label>
                <label>Password:
                <input id="user-password" type="password" onChange = {enterSignUpInputs} value = {createUserInputs["password"]}/>
                </label>
                <label>Password Confirmation:
                <input id="user-password-confirmation" type="password" onChange = {enterSignUpInputs} value = {createUserInputs["passwordConfirm"]}/>
                </label>
                <button onClick = {submitSignUpForm}>Create Account</button>
            </form>
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