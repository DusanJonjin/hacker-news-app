import React from 'react'

export function Title({ storyUrl, title }) {

    return (
        <h2>
            <a href={storyUrl} target='_blank' 
            rel='noopener noreferrer'
            >
            {title}
            </a>
        </h2>
    );
}
