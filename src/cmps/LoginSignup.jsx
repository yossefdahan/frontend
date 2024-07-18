import { useState } from 'react';
import { login, signup } from '../store/user.actions';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { LoginForm } from './LoginForm';

export function LoginSignup({ onClose }) {
    const [isSignup, setIsSignup] = useState(false)

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    function _login(credentials) {
        login(credentials)
            .then(() => {
                showSuccessMsg('Logged in successfully')
                onClose()
            })
            .catch((err) => { showErrorMsg('Invalid username or password') })
    }

    function _signup(credentials) {
        signup(credentials)
            .then(() => {
                showSuccessMsg('Signed in successfully')
                onClose()
            })
            .catch((err) => { showErrorMsg('Username already taken') })
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="login-signup-modal" onClick={e => e.stopPropagation()}>
                <LoginForm
                    onLogin={onLogin}
                    isSignup={isSignup}
                    onClose={onClose}
                />
                <div className="toggle-btns">
                    <div className="btns">
                        <a href="#" onClick={() => setIsSignup(!isSignup)}>
                            {isSignup ?
                                'Already a member? Login' :
                                'New user? Signup here'
                            }
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
