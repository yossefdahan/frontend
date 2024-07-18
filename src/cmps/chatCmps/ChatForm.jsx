import React from 'react';

export function ChatForm({ msg, isBotMode, handleFormChange, handleLearnMessage, sendMsg }) {
    return (
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
    )
}
