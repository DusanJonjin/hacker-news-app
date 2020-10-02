import React from 'react';

export function Navbar(props) {

    const navLinksArr = ['Top stories', 'New stories', 'Comments'];

    const navLinks = navLinksArr.map(navLink => 
        <li>
            {navLink}
        </li>
    );

    return (
        <nav>
            <div>
                <img src={require('../../Images/hn-logo.png')}
                     alt='hacker-news-custom-logo'
                />
                HN App
            </div>
            <ul>
                {navLinks}
            </ul>
        </nav>
    )
}

