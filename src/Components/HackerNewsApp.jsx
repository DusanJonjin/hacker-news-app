import React from 'react';
import { Navbar } from './Navbar/Navbar';
import { TopStories } from './Stories/TopStories';
import { NewStories } from './Stories/NewStories';
import { CommentsByTime } from './Comments By Time/CommentsByTime';
import { Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { navLinksArr } from '../Utilities/miscData';
//import './HackerNewsApp.css';

function HackerNewsApp() {

    const { pathname } = useLocation();

    // Get array of all existing pathnames:
    const allPathnames = navLinksArr.map(navLink => navLink.path);

    //If URL pathname doesn't exist or it is not correct:
    const isWrongUrl = !allPathnames.includes(pathname);
    
    return (
        <div className="App">
            <header className="App-header">
                <Navbar />
            </header>
                <main>
                    {isWrongUrl ? 
                        <p>Wrong turn!</p>
                      : <Switch>
                            <Route exact path='/'>
                                <TopStories />
                            </Route>
                            <Route path='/new_stories'>
                                <NewStories />
                            </Route>
                            <Route path='/comments'>
                                <CommentsByTime />
                            </Route>
                        </Switch>
                    }
                </main>
            <footer>
            </footer>
        </div>
    );
}

export default HackerNewsApp;
