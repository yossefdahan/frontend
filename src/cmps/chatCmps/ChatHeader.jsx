import React from 'react';

export function ChatHeader({ room, isBotMode, setIsBotMode, navigate }) {
    return (
        <div>
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
        </div>
    )
}
