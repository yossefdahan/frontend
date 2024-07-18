import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_USERS_IN_ROOM } from '../services/socket.service';
import { sendMessage, learnResponse } from '../store/chat.actions';
import { ChatHeader } from '../cmps/chatCmps/ChatHeader';
import { ChatMessages } from '../cmps/chatCmps/ChatMessages';
import { ChatForm } from '../cmps/chatCmps/ChatForm';

export function ChatApp() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { room } = useParams()
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [isBotMode, setIsBotMode] = useState(false)
    const [users, setUsers] = useState([])

    const botTimeoutRef = useRef()
    const chatEndRef = useRef(null)

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.on(SOCKET_EVENT_USERS_IN_ROOM, updateUsers)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            socketService.off(SOCKET_EVENT_USERS_IN_ROOM, updateUsers)
            botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        }
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, room)
    }, [room])

    useEffect(() => {
        scrollToBottom()
    }, [msgs])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    async function sendBotResponse(userMsg) {
        botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        botTimeoutRef.current = setTimeout(async () => {
            try {
                const botResponse = await dispatch(sendMessage(userMsg.txt, userMsg.room))
            } catch (error) {
                console.error('Failed to get bot response:', error)
            }
        }, 1250)
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Guest'
        const newMsg = { from, txt: msg.txt, room }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        addMsg(newMsg)
        if (isBotMode) sendBotResponse(newMsg)
        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    function scrollToBottom() {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    function updateUsers(users) {
        setUsers(users)
    }

    async function handleLearnMessage(ev) {
        ev.preventDefault()
        const userMessage = msg.txt.toLowerCase()
        if (userMessage.startsWith('learn:')) {
            const [key, value] = userMessage.substring(6).split('::')
            if (key && value) {
                await dispatch(learnResponse(key.trim(), value.trim(), room))
                addMsg({ from: 'Bot', txt: `Learned new response for "${key.trim()}"` })
            } else {
                addMsg({ from: 'Bot', txt: 'Invalid learning format. Use learn:<question>::<response>' })
            }
        } else {
            sendMsg(ev)
        }
        setMsg({ txt: '' })
    }

    return (
        <section className="chat">
            <ChatHeader
                room={room}
                isBotMode={isBotMode}
                setIsBotMode={setIsBotMode}
                navigate={navigate}
            />

            <div className="room-chat">
                <ChatMessages
                    msgs={msgs}
                    chatEndRef={chatEndRef}
                />

                <ChatForm
                    msg={msg}
                    isBotMode={isBotMode}
                    handleFormChange={handleFormChange}
                    handleLearnMessage={handleLearnMessage}
                    sendMsg={sendMsg}
                />

            </div>
            <p>Users in Room: {users.length}</p>
        </section>
    )
}
