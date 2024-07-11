import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function HomePage() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    const rooms = ['Love', 'Politics', 'Sports', 'Music']

    function joinRoom(room) {
        if (!loggedInUser) showErrorMsg('MUST BE LOGGED IN')
        else {
            showSuccessMsg(`Welcome ${loggedInUser.fullname} to ${room}`)
            navigate(`/chat/${room}`)
        }
    }


    return (
        <section>
            <h2>Choose a Room to Chat</h2>
            <ul>
                {rooms.map((room, idx) => (
                    <li key={idx}>
                        <button onClick={() => joinRoom(room)}>{room}</button>
                    </li>
                ))}
            </ul>
        </section>
    )
}