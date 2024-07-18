import React from 'react';

export function ChatMessages({ msgs, chatEndRef }) {
    return (
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
    )
}
