import React, { useContext, useEffect } from 'react';
import { Header } from './Header/Header';
import { Stories } from './Stories/Stories';
import { CommentsByTime } from './Comments By Time/CommentsByTime';
import { DarkThemeContext } from '../Context/DarkThemeContext'
import { Route, Switch, Redirect } from 'react-router-dom';
import { navLinksDataArr } from '../Utilities/miscData';
import './HackerNewsApp.css';

function HackerNewsApp() {

    const { darkTheme } = useContext(DarkThemeContext);

    /* Make an Route array of Stories components only. This way the component unmounts
    every time the Route is changed. If we simply put the same component with
    different paths inside Switch, that component will not unmount on Route change
    between them, it will always be mounted but with different props: */
    const storiesRoutes = navLinksDataArr.reduce((acc, navLink, i) => 
        navLink.name !== 'All comments' ?
            [
                ...acc,
                <Route key={i} path={navLink.path}>
                    <Stories storiesApiName={navLink.api} />
                </Route>
            ]
          : acc
    , []);

    useEffect(() => {
        const bodyStyle = document.body.style;
        if (darkTheme) bodyStyle.backgroundColor = `rgb(32, 32, 33)`;
        else bodyStyle.backgroundColor = `rgb(243, 243, 245)`;
    }, [darkTheme]);
    
    return (
        <div className={`app-wrapper ${darkTheme ? 'app-dark' : ''}`}>
            <Header />
            <main>
                <Switch>
                    <Redirect exact from='/' to='/top_stories'/>
                    {storiesRoutes}
                    <Route exact path='/all_comments'>
                        <CommentsByTime />
                    </Route>
                    <Route path='*'>
                        <h1>No match for this URL!</h1>
                    </Route>
                </Switch>       
            </main>
            <footer className={`app-footer ${darkTheme ? 'foot-dark' : ''}`}>
            © {new Date().getFullYear().toString()}. Hacker News App by D.J.
            </footer>
        </div>
    );
}

export default HackerNewsApp;
