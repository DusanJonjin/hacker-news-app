import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Navbar } from './Navbar/Navbar';
import { Stories } from './Stories/Stories';
import { CommentsByTime } from './Comments By Time/CommentsByTime';
//import './HackerNewsApp.css';

function HackerNewsApp() {
    return (
        <div className="App">
            <header className="App-header">
                <Navbar />
            </header>
                <main>
                    <Switch>
                        <Route exact path='/'>
                            <Stories />
                        </Route>
                        <Route path='/comments'>
                            <CommentsByTime />
                        </Route>
                    </Switch>
                </main>
            <footer>
            </footer>
        </div>
    );
}

export default HackerNewsApp;
