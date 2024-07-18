import { Routes, Route } from 'react-router';

import { AppHeader } from './cmps/AppHeader';
import { HomePage } from './pages/HomePage';
import { About } from './pages/About';
import { ChatApp } from './pages/Chat';
import { AppFooter } from './cmps/AppFooter';


export function RootCmp() {

    return (
        <div className='main-container'>
            <AppHeader />
            <main className='main-content'>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/chat/:room" element={<ChatApp />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}
