import React, { useContext } from 'react';
import { Header } from './Header/Header';
import { Stories } from './Stories/Stories';
import { CommentsByTime } from './Comments By Time/CommentsByTime';
import { DarkThemeContext } from '../Context/DarkThemeContext'
import { Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { navLinksDataArr } from '../Utilities/miscData';
import './HackerNewsApp.css';

function HackerNewsApp() {

    const { darkTheme } = useContext(DarkThemeContext);

    const { pathname } = useLocation();

    // Get array of all existing pathnames:
    const allPathnames = navLinksDataArr.map(navLink => navLink.path);

    //If URL pathname doesn't exist or it is not correct:
    const isWrongUrl = !allPathnames.includes(pathname);

    /* Make an Route array of Stories components only. This way the component unmounts
    every time the Route is changed. If we simply put the same component with
    different paths inside Switch, that component will not unmount on Route change
    between them, it will always be mounted but with different props: */
    const storiesRoutes = navLinksDataArr.reduce((acc, navLink, i) => 
        navLink.name !== 'Comments' ?
            [
                ...acc,
                <Route key={i} exact={navLink.path === '/'} path={navLink.path}>
                    <Stories storiesApiName={navLink.api} />
                </Route>
            ]
          : acc
    , []);
    
    return (
        <div className={`app-wrapper ${darkTheme ? 'app-dark' : ''}`}>
            <Header />
            <main>
                {isWrongUrl ? 
                    <p>Wrong turn!</p>
                    : <Switch>
                        {storiesRoutes}
                        <Route path='/comments'>
                            <CommentsByTime />
                        </Route>
                    </Switch>
                }
            </main>
            <footer className={`app-footer ${darkTheme ? 'foot-dark' : ''}`}>
            © {new Date().getFullYear().toString()}. Hacker News App by D.J.
            </footer>
        </div>
    );
}

export default HackerNewsApp;
