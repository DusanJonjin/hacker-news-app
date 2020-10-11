import React, { useContext } from 'react';
import { Header } from './Header/Header';
import { TopStories } from './Stories/TopStories';
import { NewStories } from './Stories/NewStories';
import { CommentsByTime } from './Comments By Time/CommentsByTime';
import { DarkThemeContext } from '../Context/DarkThemeContext'
import { Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { navLinksArr } from '../Utilities/miscData';
import './HackerNewsApp.css';

function HackerNewsApp() {

    const { darkTheme } = useContext(DarkThemeContext);

    const { pathname } = useLocation();

    // Get array of all existing pathnames:
    const allPathnames = navLinksArr.map(navLink => navLink.path);

    //If URL pathname doesn't exist or it is not correct:
    const isWrongUrl = !allPathnames.includes(pathname);
    
    return (
        <div className={`app-wrapper ${darkTheme ? 'app-dark' : ''}`}>
            <Header />
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
            <footer className='app-footer'>
                © Hacker News App by D.J.
            </footer>
        </div>
    );
}

export default HackerNewsApp;
