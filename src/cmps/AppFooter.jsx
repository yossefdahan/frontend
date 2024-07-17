import React from 'react';
import { UserMsg } from './UserMsg.jsx';

export function AppFooter() {
    return (
        <footer className="app-footer">

            <div className="links-container">
                <p style={{ fontSize: "1rem" }}>&copy; 2024 ChatApp. All rights reserved Yossef Dahan</p>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '50px', color: 'white', fontSize: "1.2rem", marginBottom: "-8px" }}>
                    <a href="https://github.com/yossefdahan" target="_blank" rel="noopener noreferrer" style={{ margin: "0" }}><img src="/img/github.svg" alt="" style={{ width: "25px" }} /></a>
                    <a href="https://www.linkedin.com/in/yossef-dahan-fs18/" target="_blank" rel="noopener noreferrer" style={{ margin: "0" }}><img src="/img/linkdin.svg" alt="" style={{ width: "25px" }} /></a>
                </div>
                {/* <p style={{ fontSize: "1rem" }}>&copy; 2024 ChatApp</p> */}
            </div>

            <UserMsg />
        </footer>
    );
}
