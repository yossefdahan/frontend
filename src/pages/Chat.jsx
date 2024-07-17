import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_USERS_IN_ROOM } from '../services/socket.service';
import { useNavigate, useParams } from 'react-router';
import { sendMessage, learnResponse } from '../store/chat.actions';

export function ChatApp() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { room } = useParams();
    const [msg, setMsg] = useState({ txt: '' });
    const [msgs, setMsgs] = useState([]);
    const [isBotMode, setIsBotMode] = useState(false);
    const [users, setUsers] = useState([]);

    const botTimeoutRef = useRef();
    const chatEndRef = useRef(null);

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg);
        socketService.on(SOCKET_EVENT_USERS_IN_ROOM, updateUsers);
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg);
            socketService.off(SOCKET_EVENT_USERS_IN_ROOM, updateUsers);
            botTimeoutRef.current && clearTimeout(botTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, room);
    }, [room]);

    useEffect(() => {
        scrollToBottom();
    }, [msgs]);

    function addMsg(newMsg) {
        console.log('New message added:', newMsg);
        setMsgs(prevMsgs => [...prevMsgs, newMsg]);
    }

    async function sendBotResponse(userMsg) {
        botTimeoutRef.current && clearTimeout(botTimeoutRef.current);
        botTimeoutRef.current = setTimeout(async () => {
            console.log('sendBotResponse called with userMsg:', userMsg);
            try {
                const botResponse = await dispatch(sendMessage(userMsg.txt, userMsg.room));
                console.log('Bot response received:', botResponse);
            } catch (error) {
                console.error('Failed to get bot response:', error);
            }
        }, 1250);
    }

    function sendMsg(ev) {
        ev.preventDefault();
        const from = loggedInUser?.fullname || 'Guest';
        const newMsg = { from, txt: msg.txt, room };
        console.log('Sending message:', newMsg);
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg);
        addMsg(newMsg);
        if (isBotMode) sendBotResponse(newMsg);
        setMsg({ txt: '' });
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target;
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }));
    }

    function scrollToBottom() {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    function updateUsers(users) {
        setUsers(users);
    }

    async function handleLearnMessage(ev) {
        ev.preventDefault();
        const userMessage = msg.txt.toLowerCase();
        if (userMessage.startsWith('learn:')) {
            const [key, value] = userMessage.substring(6).split('::');
            if (key && value) {
                await dispatch(learnResponse(key.trim(), value.trim(), room));
                addMsg({ from: 'Bot', txt: `Learned new response for "${key.trim()}"` });
            } else {
                addMsg({ from: 'Bot', txt: 'Invalid learning format. Use learn:<question>::<response>' });
            }
        } else {
            sendMsg(ev);
        }
        setMsg({ txt: '' });
    }

    return (
        <section className="chat">
            <h2>Let's Chat about {room}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', gap: '90px' }}>
                <button className='home-btn' onClick={() => navigate('/')}>Home</button>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="status-text">{isBotMode ? <img src="/img/bot-active.svg" alt="" style={{ width: "25px" }} /> : <img src="/img/bot-inactive.svg" alt="" style={{ width: "25px" }} />}</span>
                    <div className="pill-switch">
                        <input type="checkbox" id="bot-toggle" name="isBotMode" checked={isBotMode} onChange={({ target }) => setIsBotMode(target.checked)} />
                        <label className="pill-label" htmlFor="bot-toggle">
                            <span className="pill-indicator"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="room-chat">
                <div className="chat-container">
                    <ul>
                        {msgs.map((msg, idx) => (
                            <li key={idx} className={msg.from === 'Bot' ? 'bot-msgs' : 'user-msgs'}>
                                <strong>{msg.from}: </strong>
                                {msg.txt}
                            </li>
                        ))}
                        <div ref={chatEndRef}></div>
                    </ul>
                </div>

                <form onSubmit={isBotMode ? handleLearnMessage : sendMsg}>
                    <input
                        type="text"
                        value={msg.txt}
                        onChange={handleFormChange}
                        name="txt"
                        autoComplete="off"
                        placeholder="Type a message..."
                    />
                    <button className='send-btn'>Send</button>
                </form>
            </div>
            <p>Users in Room: {users.length}</p>
        </section>
    );
}
