import React from 'react';
import { Navbar } from './Navbar/Navbar';
import { Stories } from './Stories/Stories';
//import './HackerNewsApp.css';

function HackerNewsApp() {
    return (
        <div className="App">
            <header className="App-header">
                <Navbar />
            </header>
                <main>
                    <Stories />
                </main>
            <footer>
            </footer>
        </div>
    );
}

export default HackerNewsApp;
