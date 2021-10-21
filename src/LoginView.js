import React, { useState } from "react"
import { FcKey } from 'react-icons/fc'
import './LoginView.css'
import { app } from "./Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AiOutlineLoading } from 'react-icons/ai'

const LoginView = () => {

    const [isLoginLoading, setLoginLoading] = useState(false)

    const handleLogin = () => {

        const auth = getAuth();

        setLoginLoading(true)

        signInWithEmailAndPassword(auth, "aaronssikua@gmail.com", "123456")
            .then((userCredential) => {
                console.log(userCredential.user)
                setLoginLoading(false)
            })
            .catch((err) => {
                console.log(err.code)
                setLoginLoading(false)
            })
    }

    return <div className="login-wrapper">
        <div className="login-box">
            <div id="login-header">
                <div className="icon-wrapper">
                    <FcKey id="header-icon"/>
                </div>
                <div id="login-header-column">
                    <p id="login-title">Login</p>
                    <p id="login-subtitle">Enter email and password</p>
                </div>
            </div>

            <div className="form-column">
                    <label className="textbox-title">Email</label>
                    <input className="textbox" type="email" placeholder="user@mail.com"></input>
                </div>

                <div className="form-column">
                    <label className="textbox-title">Password</label>
                    <input className="textbox" type="email" placeholder="Password"></input>
                </div>

                <button id="button" onMouseUp={handleLogin}>
                    {isLoginLoading ? <AiOutlineLoading className="loading-icon" /> : "Submit"}
                </button>
        </div>
    </div>
}

export default LoginView