import { useSelector } from 'react-redux';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { login, logout, signup } from '../store/user.actions.js';
import { LoginSignup } from './LoginSignup.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { socketService } from '../services/socket.service';

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            socketService.connect(user);
        } else {
            socketService.disconnect();
        }
    }, [user]);

    async function onLogin(credentials) {
        try {
            const user = await login(credentials);
            showSuccessMsg(`Welcome: ${user.fullname}`);
        } catch (err) {
            showErrorMsg('Cannot login');
        }
    }

    async function onSignup(credentials) {
        try {
            const user = await signup(credentials);
            showSuccessMsg(`Welcome new user: ${user.fullname}`);
        } catch (err) {
            showErrorMsg('Cannot signup');
        }
    }

    async function onLogout() {
        try {
            await logout();
            showSuccessMsg(`Bye now`);
            navigate('/');
        } catch (err) {
            showErrorMsg('Cannot logout');
        }
    }

    return (
        <header className="app-header full">
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                <img className='logo' src={"/img/logo.PNG"} onClick={() => navigate('/')} style={{ cursor: 'pointer' }} alt="Logo" />
                <button className='about-btn' onClick={() => navigate('/about')}>About</button>
            </div>

            {user ?
                <section className="user-info">
                    <div>
                        <span style={{ color: 'white' }}>Hello, {user.fullname}</span>
                    </div>
                    <button onClick={onLogout} className='logout-btn'>Logout</button>
                </section>
                :
                <section className="user-info">
                    <button className="login-ham-btn" onClick={toggleModal}>Login</button>
                </section>
            }
            {isModalOpen && <LoginSignup onClose={toggleModal} onLogin={onLogin} onSignup={onSignup} />}
        </header>
    );
}
