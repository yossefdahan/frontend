import React from 'react'

export function ChatMessages({ messages }) {
    return (
        <div className="chat-container">
            <ul>
                {messages.map((msg, idx) => (
                    <li key={idx} className={msg.from === 'Bot' ? 'bot-msgs' : 'user-msgs'}>
                        <strong>{msg.from}: </strong>
                        {msg.txt}
                    </li>
                ))}
                <div id="chat-end"></div>
            </ul>
        </div>
    )
}
