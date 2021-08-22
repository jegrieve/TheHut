import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const SignUpForm = (props) => {
    const [createUserInputs, setCreateUserInputs] = useState({
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
    });
    const [formErrors, setFormErrors] = useState(null)
    const [formSuccesses, setFormSuccesses] = useState(null)

    useEffect(() => {
        const formSuccessKeys = {
            'email': true,
            'username': true,
            'password': true,
            'password_confirmation' : true
        }
        if (formErrors) {
            for (const key in formErrors) {

                switch(key) {
                    case 'email':
                        document.getElementById("signup-emailInput").classList.remove("is-valid")
                        document.getElementById("signup-emailInput").classList.add("is-invalid")
                        document.getElementById("signup-emailHelp").innerHTML = `Email ${formErrors[key]}`
                        formSuccessKeys['email'] = false;
                      break;

                    case 'username':
                        document.getElementById("signup-usernameInput").classList.remove("is-valid")
                        document.getElementById("signup-usernameInput").classList.add("is-invalid")
                        document.getElementById("signup-usernameHelp").innerHTML = `Username ${formErrors[key]}`
                        formSuccessKeys['username'] = false;
                      break;

                    case 'password':
                        document.getElementById("signup-passwordInput").classList.remove("is-valid")
                        document.getElementById("signup-passwordInput").classList.add("is-invalid")
                        document.getElementById("signup-passwordHelp").innerHTML = `Password ${formErrors[key]}`
                        formSuccessKeys['password'] = false;
                      break;
                      
                    case 'password_digest':
                        document.getElementById("signup-passwordInput").classList.remove("is-valid")
                        document.getElementById("signup-passwordInput").classList.add("is-invalid")
                        document.getElementById("signup-passwordHelp").innerHTML = `Pasword ${formErrors[key]}`
                        formSuccessKeys['password'] = false;
                      break;

                    case 'password_confirmation':
                        document.getElementById("signup-password-confirmInput").classList.remove("is-valid")
                        document.getElementById("signup-password-confirmInput").classList.add("is-invalid")
                        document.getElementById("signup-password-confirmHelp").innerHTML = `Pasword confirmation ${formErrors[key]}`
                        formSuccessKeys['password_confirmation'] = false;
                      break;

                    default:
                      return;
                }
            } 
        }
        setFormSuccesses(formSuccessKeys)
    }, [formErrors])

   useEffect(() => {
    if (formSuccesses && Object.keys(formSuccesses).some(k => !formSuccesses[k])) {
        for (const key in formSuccesses) {
            if (formSuccesses[key]) {
                switch(key) {
                    case 'email':
                        document.getElementById("signup-emailInput").classList.add("is-valid")
                        document.getElementById("signup-emailInput").classList.remove("is-invalid")
                        document.getElementById("signup-emailHelp").innerHTML = ''
                      break;
        
                    case 'username':
                        document.getElementById("signup-usernameInput").classList.add("is-valid")
                        document.getElementById("signup-usernameInput").classList.remove("is-invalid")
                        document.getElementById("signup-usernameHelp").innerHTML = ''
                      break;
        
                    case 'password':
                        document.getElementById("signup-passwordInput").classList.add("is-valid")
                        document.getElementById("signup-passwordInput").classList.remove("is-invalid")
                        document.getElementById("signup-passwordHelp").innerHTML = ''
                      break;
                      
                    case 'password_digest':
                        document.getElementById("signup-passwordInput").classList.add("is-valid")
                        document.getElementById("signup-passwordInput").classList.remove("is-invalid")
                        document.getElementById("signup-passwordHelp").innerHTML = ''
                      break;
        
                    case 'password_confirmation':
                        document.getElementById("signup-password-confirmInput").classList.add("is-valid")
                        document.getElementById("signup-password-confirmInput").classList.remove("is-invalid")
                        document.getElementById("signup-password-confirmHelp").innerHTML = ''
                      break;
                    default:
                      return;
                }
            }
        } 
    }

   },[formSuccesses])


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
        const url = "/api/v1/registrations/create"
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
            console.log(response) 
            if (response.id) {
                exitSignUpForm();
                props.setCurrentUser(response)
            } else {
                setFormErrors(response);
            }
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
            <button className = "btn btn-secondary" onClick = {bringUpSignUpForm}>Sign Up</button>
            <div className = "sign-up-form d-none clickable">
                <form onSubmit = {submitSignUpForm} className = "sign-up-inputs">
                    <div>
                    <span className = "sign-up-title">Sign Up</span>
                    <span onClick = {exitSignUpForm} type="button" className="close close-btn-container" aria-label="Close">
                        <FontAwesomeIcon icon={faTimes} />
                        {/* <span className="close-btn" aria-hidden="true">&times;</span> */}
                    </span>
                    </div>
                    <div className = "form-group">
                        <label className = "sign-up-label email-label">Email:
                            <input id = "signup-emailInput" className = "form-control" name = "email" type="email" onChange = {enterSignUpInputs} value = {createUserInputs["email"]} />
                        </label>
                        <small id="signup-emailHelp" className="form-text red-text"></small>
                    </div>
                    <div className = "form-group">
                        <label className = "sign-up-label">Username:
                            <input id = "signup-usernameInput" className ="form-control" name = "username" type="text" onChange = {enterSignUpInputs} value = {createUserInputs["username"]} minLength = "5"/>
                        </label>
                        <small id="signup-usernameHelp" className="form-text red-text"></small>
                    </div>
                    <div className = "form-group">
                        <label className = "sign-up-label">Password:
                            <input id = "signup-passwordInput" className ="form-control" name = "password" type="password" onChange = {enterSignUpInputs} value = {createUserInputs["password"]} minLength = "5"/>
                        </label>
                        <small id="signup-passwordHelp" className="form-text red-text"></small>
                    </div>
                    <div className = "form-group">
                        <label className = "sign-up-label">Password Confirmation:
                            <input id = "signup-password-confirmInput" className = "form-control" name = "passwordConfirm" type="password" onChange = {enterSignUpInputs} value = {createUserInputs["passwordConfirm"]} minLength = "5"/>
                        </label>
                    <small id="signup-password-confirmHelp" className="form-text red-text"></small>
                    </div>
                    <div className = "sign-up-btn">
                        <button className = "btn btn-success" type = "submit">Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default SignUpForm;