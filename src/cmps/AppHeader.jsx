import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'
import { useState } from 'react'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const toggleModal = () => setIsModalOpen(!isModalOpen)
    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className="app-header">
            <h1 className='logo'>Messenger</h1>



            {user ?
                <section className="user-info" >
                    <div>
                        <span> {user.imgUrl && <img src={user.imgUrl} />}</span>
                        <span style={{ color: 'white' }}>Hello, {user.fullname}</span>
                    </div>

                    <button onClick={onLogout} className='logout-btn'>Logout</button>
                </section> :

                <section className="user-info">

                    {isModalOpen && <LoginSignup onClose={toggleModal} />}
                    <button className="login-ham-btn" onClick={toggleModal}>Login</button>

                </section>
            }



        </header>
    )
}