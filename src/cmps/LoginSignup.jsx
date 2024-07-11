import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from './ImgUploader'
import { LoginForm } from './LoginForm'
import { login, signup } from '../store/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function LoginSignup({ onClose }) {
    const [isSignup, setIsSignUp] = useState(false)

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    function _login(credentials) {
        login(credentials)
            .then(() => { showSuccessMsg('Logged in successfully') })
            .catch((err) => { showErrorMsg('Oops try again') })
    }

    function _signup(credentials) {
        signup(credentials)
            .then(() => { showSuccessMsg('Signed in successfully') })
            .catch((err) => { showErrorMsg('Oops try again') })
    }


    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="login-signup-modal" onClick={e => e.stopPropagation()}>
                <LoginForm
                    onLogin={onLogin}
                    isSignup={isSignup}
                    onClose={onClose}
                    onUploaded={onUploaded}
                />

                <div className="toggle-btns">
                    <div className="btns">
                        <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                            {isSignup ?
                                'Already a member? Login' :
                                'New user? Signup here'
                            }
                        </a >
                    </div>
                </div>

            </div>
        </div>

    )
}