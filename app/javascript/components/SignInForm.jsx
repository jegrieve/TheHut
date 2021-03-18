import React, {useState, useEffect} from "react";

const SignInForm = (props) => {
    const [signInUserInputs, setSignInUserInputs] = useState({
        username: "",
        password: "",
    });

    // useEffect(() => {
    //     if (props.currentUser) {
    //         setSignInUserInputs({
    //             username: "",
    //             password: "",
    //         })
    //     }
    // })

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
                console.log('invalid user or pass')
            } else if (response.id) {
                exitSignInForm();
                props.setCurrentUser(response)
            } else {
                console.log(response)
            }
        })
        .catch(error => console.log(error.message))
    }

    const enterSignInInputs = (e) => {
        switch (e.target.id) {
          case 'sign-in-user-username':
            setSignInUserInputs(ps => ({
                ...ps,
                username: e.target.value,
            }));
            break;
          case 'sign-in-user-password':
            setSignInUserInputs(ps => ({
                ...ps,
                password: e.target.value,
            }));
            break;
          default:
            return;
        }
      };

    return (
        <div>
            <button onClick = {bringUpSignInForm}>Log In</button>
            <form className = "sign-in-form d-none">
                <label>Username:
                <input id="sign-in-user-username" type="text" onChange = {enterSignInInputs} value = {signInUserInputs["username"]}/>
                </label>
                <label>Password:
                <input id="sign-in-user-password" type="password" onChange = {enterSignInInputs} value = {signInUserInputs["password"]}/>
                </label>
                <button onClick = {submitSignInForm}>Log In</button>
            </form>
        </div>
    )
}



export default SignInForm;