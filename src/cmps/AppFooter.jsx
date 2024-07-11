import React from 'react';
import { UserMsg } from './UserMsg.jsx';

export function AppFooter() {
    return (
        <footer className="app-footer">
            <h2>Stay in Touch</h2>
            <p>&copy; 2024 Messenger. All rights reserved.</p>
            <UserMsg />
        </footer>
    );
}
