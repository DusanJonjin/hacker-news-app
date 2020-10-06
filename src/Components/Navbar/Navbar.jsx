import React from 'react';
import { navLinksArr } from '../../Utilities/miscData';
import { Link } from 'react-router-dom';

export function Navbar(props) {

    const navLinks = navLinksArr.map((navLink, i) => 
        <Link key={i} to={{pathname: navLink.path}}>
            <li>
                {navLink.name}
            </li>
        </Link>
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

