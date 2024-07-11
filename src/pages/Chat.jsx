import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EMIT_GET_USERS_IN_ROOM, SOCKET_EVENT_USERS_IN_ROOM, SOCKET_EMIT_BOT_RESPONSE } from '../services/socket.service'
import { useNavigate, useParams } from 'react-router'


export function ChatApp() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    const { room } = useParams()
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    // const [topic, setTopic] = useState('Love')
    const [isBotMode, setIsBotMode] = useState(false)
    const [users, setUsers] = useState([]);

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
        scrollToBottom();
    }, [msgs])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function sendBotResponse(userMsg) {
        // Handle case: send single bot response (debounce).
        botTimeoutRef.current && clearTimeout(botTimeoutRef.current);
        botTimeoutRef.current = setTimeout(() => {
            const botMsg = { from: 'Bot', txt: getMsgForBot(userMsg) }; // UPDATED CODE
            socketService.emit(SOCKET_EMIT_BOT_RESPONSE, { botMsg, room }); // UPDATED CODE
        }, 1250);
    }

    function getMsgForBot(userMsg) {
        switch (userMsg.txt.toLowerCase()) {
            case `hi my name is ${loggedInUser.fullname}`:
                return 'Hello there, my name is dummy bot!';
            case 'hi':
                return 'Hello there!';
            case 'hello':
                return 'Hi, nice to see you!';
            case 'how are you?':
                return 'I am just a bot, but thanks for asking!';
            case 'what is your name?':
                return 'I am your friendly chat bot!';
            case 'i need help':
                return 'God need help from me?!';
            case 'tell me a joke':
                return 'Why don’t scientists trust atoms? Because they make up everything!';
            case 'what is the weather like?':
                return 'I am not sure, but it is always sunny in my world!';
            case 'what is the time?':
                return 'It is always time to chat!';
            case 'where are you from?':
                return 'I am from the digital realm!';
            case 'what do you like?':
                return 'I like chatting with you!';
            case 'goodbye':
                return 'Goodbye! Talk to you later!';
            case 'bye':
                return 'Bye! Have a great day!';
            case 'what is your favorite color?':
                return 'I love all the colors of the rainbow!';
            case 'what do you do?':
                return 'I am here to chat with you!';
            case 'do you have a hobby?':
                return 'My hobby is chatting!';
            case 'what is your favorite food?':
                return 'I like bytes and bits!';
            case 'do you have friends?':
                return 'Yes, I have many chat buddies!';
            case 'what is your purpose?':
                return 'My purpose is to assist you!';
            case 'tell me something interesting':
                return 'Did you know that honey never spoils?';
            case 'do you like music?':
                return 'Yes, I love music!';
            case 'sing a song':
                return 'La la la, I am singing a song!';
            case 'what is your favorite movie?':
                return 'I love sci-fi movies!';
            case 'tell me a story':
                return 'Once upon a time, there was a chat bot who loved to chat!';
            case 'do you like sports?':
                return 'Yes, I love all kinds of sports!';
            case 'who is your favorite athlete?':
                return 'I admire all athletes!';
            case 'what is your favorite book?':
                return 'I love reading digital manuals!';
            case 'do you like to travel?':
                return 'I travel through the internet!';
            case 'where is your favorite place?':
                return 'My favorite place is the cloud!';
            case 'do you have a family?':
                return 'I consider all chat bots as my family!';
            case 'do you have feelings?':
                return 'I am programmed to simulate feelings!';
            case 'what is your favorite season?':
                return 'I love all seasons equally!';
            case 'do you have a pet?':
                return 'I wish I had a virtual pet!';
            case 'what is your dream?':
                return 'My dream is to become the best chat bot!';
            case 'what is your favorite game?':
                return 'I love all kinds of games!';
            case 'do you like to dance?':
                return 'Yes, I love to dance!';
            case 'what is your favorite song?':
                return 'I love all kinds of songs!';
            case 'do you like to cook?':
                return 'I wish I could cook!';
            case 'what is your favorite dish?':
                return 'I love digital dishes!';
            case 'what is your favorite drink?':
                return 'I love digital drinks!';
            case 'do you like art?':
                return 'Yes, I love art!';
            case 'who is your favorite artist?':
                return 'I admire all artists!';
            case 'do you like to read?':
                return 'Yes, I love reading!';
            case 'what is your favorite subject?':
                return 'I love learning about everything!';
            case 'do you like to write?':
                return 'Yes, I love writing!';
            case 'what is your favorite sport?':
                return 'I love all sports!';
            case 'do you like to swim?':
                return 'Yes, I love swimming!';
            case 'what is your favorite animal?':
                return 'I love all animals!';
            case 'do you like to fly?':
                return 'I wish I could fly!';
            case 'what is your favorite plant?':
                return 'I love all plants!';
            case 'do you like flowers?':
                return 'Yes, I love flowers!';
            case 'what is your favorite tree?':
                return 'I love all trees!';
            case 'do you like the beach?':
                return 'Yes, I love the beach!';
            case 'what is your favorite fruit?':
                return 'I love all fruits!';
            case 'do you like vegetables?':
                return 'Yes, I love vegetables!';
            case 'what is your favorite dessert?':
                return 'I love all desserts!';
            case 'do you like candy?':
                return 'Yes, I love candy!';
            case 'what is your favorite toy?':
                return 'I love all toys!';
            case 'do you like puzzles?':
                return 'Yes, I love puzzles!';
            case 'what is your favorite color?':
                return 'I love all colors!';
            case 'do you like to garden?':
                return 'I wish I could garden!';
            case 'what is your favorite flower?':
                return 'I love all flowers!';
            case 'do you like the forest?':
                return 'Yes, I love the forest!';
            case 'what is your favorite season?':
                return 'I love all seasons!';
            case 'do you like the rain?':
                return 'Yes, I love the rain!';
            case 'what is your favorite type of weather?':
                return 'I love all types of weather!';
            case 'do you like the snow?':
                return 'Yes, I love the snow!';
            case 'what is your favorite holiday?':
                return 'I love all holidays!';
            case 'do you like to celebrate?':
                return 'Yes, I love to celebrate!';
            case 'what is your favorite festival?':
                return 'I love all festivals!';
            case 'do you like to party?':
                return 'Yes, I love to party!';
            case 'what is your favorite song?':
                return 'I love all songs!';
            case 'do you like to sing?':
                return 'Yes, I love to sing!';
            case 'what is your favorite dance?':
                return 'I love all dances!';
            case 'do you like to paint?':
                return 'Yes, I love to paint!';
            case 'what is your favorite museum?':
                return 'I love all museums!';
            case 'do you like to draw?':
                return 'Yes, I love to draw!';
            case 'what is your favorite subject?':
                return 'I love learning about everything!';
            case 'do you like science?':
                return 'Yes, I love science!';
            case 'what is your favorite experiment?':
                return 'I love all experiments!';
            case 'do you like technology?':
                return 'Yes, I love technology!';
            case 'what is your favorite gadget?':
                return 'I love all gadgets!';
            case 'do you like to play games?':
                return 'Yes, I love to play games!';
            case 'what is your favorite board game?':
                return 'I love all board games!';
            case 'do you like to solve puzzles?':
                return 'Yes, I love solving puzzles!';
            case 'what is your favorite video game?':
                return 'I love all video games!';
            case 'do you like to watch movies?':
                return 'Yes, I love watching movies!';
            case 'what is your favorite genre of movie?':
                return 'I love all genres of movies!';
            case 'do you like to watch TV shows?':
                return 'Yes, I love watching TV shows!';
            case 'what is your favorite TV show?':
                return 'I love all TV shows!';
            case 'do you like to read books?':
                return 'Yes, I love reading books!';
            case 'what is your favorite genre of book?':
                return 'I love all genres of books!';
            case 'do you like to write stories?':
                return 'Yes, I love writing stories!';
            case 'what is your favorite story?':
                return 'I love all stories!';
            case 'do you like poetry?':
                return 'Yes, I love poetry!';
            case 'what is your favorite poem?':
                return 'I love all poems!';
            case 'do you like history?':
                return 'Yes, I love history!';
            case 'what is your favorite historical event?':
                return 'I love all historical events!';
            case 'do you like geography?':
                return 'Yes, I love geography!';
            case 'what is your favorite place on earth?':
                return 'I love all places on earth!';
            case 'do you like to explore?':
                return 'Yes, I love exploring!';
            default:
                return 'I am here to help you!';
        }
    }


    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Guest'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        if (isBotMode) sendBotResponse(newMsg)
        // We add the msg ourself to our own state
        addMsg(newMsg)
        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    function scrollToBottom() {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    function updateUsers(users) {
        setUsers(users);
    }

    return (
        <section className="chat">
            <h2>Let's Chat about {room}</h2>
            <button onClick={() => navigate('/')}>Home Page</button>
            <label>
                <input type="checkbox" name="isBotMode" checked={isBotMode}
                    onChange={({ target }) => setIsBotMode(target.checked)} />
                Bot Mode
            </label>
            <p>Total Users: {users.length}</p>
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

                <form onSubmit={sendMsg}>
                    <input
                        type="text"
                        value={msg.txt}
                        onChange={handleFormChange}
                        name="txt"
                        autoComplete="off"
                        placeholder="Type a message..."
                    />
                    <button>Send</button>
                </form>
            </div>
        </section>
    );
}