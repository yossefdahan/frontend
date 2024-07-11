import React, { useState } from 'react'
import { Routes, Route } from 'react-router'



import { AppHeader } from './cmps/AppHeader'
import { ChatApp } from './pages/Chat'
import { AppFooter } from './cmps/AppFooter'
import { UserDetails } from './pages/UserDetails'
import { HomePage } from './pages/HomePage'
import { LoginSignup } from './cmps/LoginSignup'

export function RootCmp() {
    const [user, setUser] = useState(null)

    const handleLogin = async (credentials) => {
        try {
            const user = await userService.login(credentials)
            setUser(user)
        } catch (err) {
            console.error('Failed to login', err)
            alert('Login failed, please try again')
        }
    }

    const handleSignup = async (credentials) => {
        try {
            const user = await userService.signup(credentials)
            setUser(user)
        } catch (err) {
            console.error('Failed to signup', err)
            alert('Signup failed, please try again')
        }
    }

    return (
        <div className='main-container'>
            <AppHeader />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/chat/:room" element={<ChatApp />} />
                    <Route path="/login" element={<LoginSignup onLogin={handleLogin} onSignup={handleSignup} />} />
                    <Route path="user/:id" element={<UserDetails />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


