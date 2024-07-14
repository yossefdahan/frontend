import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { ImageButton } from '../cmps/ImageButton';

export function HomePage() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user);
    const navigate = useNavigate();

    const rooms = [
        { name: 'Love', img: '/img/love.jpeg' },
        { name: 'Politics', img: '/img/politics.jpeg' },
        { name: 'developers', img: '/img/developers.jpeg' },
        { name: 'Sports', img: '/img/sports.jpeg' },
        { name: 'Music', img: '/img/music.jpeg' }
    ];

    function joinRoom(room) {
        if (!loggedInUser) showErrorMsg('MUST BE LOGGED IN');
        else {
            showSuccessMsg(`Welcome ${loggedInUser.fullname} to ${room.name}`);
            navigate(`/chat/${room.name}`);
        }
    }

    return (
        <section>
            <h2 style={{ textAlign: 'center' }}>Choose a Room to Chat</h2>
            <ul style={{ display: 'flex', justifyContent: 'center', gap: '10px', listStyleType: 'none', flexWrap: 'wrap', padding: 0 }}>                {rooms.map((room, idx) => (
                <li key={idx}>
                    <ImageButton
                        src={room.img}
                        alt={room.name}
                        onClick={() => joinRoom(room)}
                    />
                </li>
            ))}
            </ul>
        </section>
    );
}
