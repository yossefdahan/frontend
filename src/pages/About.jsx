import React from 'react';
import { useNavigate } from 'react-router';

export function About() {
    const navigate = useNavigate()
    return (
        <div className="about-page">
            <header className="about-header">
                <img className="logo" src="/img/logo.PNG" alt="ChatApp Logo" style={{ cursor: 'pointer' }} onClick={() => navigate("/")} />
                <h1>About ChatApp</h1>
            </header>
            <section className="about-content">
                <p>
                    Welcome to ChatApp! Our mission is to create a platform where people can connect, learn, and chat with ease. Whether you're looking to make new friends, learn new things, or simply chat with like-minded individuals, ChatApp is here for you.
                </p>
                <p>
                    Our app offers a variety of chat rooms, each tailored to different interests and communities. Join the conversation in our Love, Politics, or Developers rooms.
                </p>
                <p>
                    One of the unique features of ChatApp is our smart bot, which can learn from your inputs! Simply teach the bot by typing <code>learn:&lt;question&gt;::&lt;response&gt;</code> and it will remember and respond accordingly.
                </p>
                <p>
                    ChatApp was created by Yossef Dahan, a passionate developer dedicated to building communities and fostering communication. For more information or to get in touch, please visit our <a href="https://github.com/yossefdahan" target="_blank" rel="noopener noreferrer">GitHub</a> or <a href="https://www.linkedin.com/in/yossef-dahan-fs18/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
                </p>
                <note>to go back home, click on the logo</note>
            </section>
        </div >
    )
}
