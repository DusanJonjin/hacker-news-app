import React from 'react';
import  { Story } from './Story';

export function StoriesList(props) {

    const fakeStoriesArr = Array.from({length: 30}, (v, i) => i + 1);
    
    const storiesList = fakeStoriesArr.map((v, i) => 
        <li key={i}>
            <Story  />
        </li>
    )
    return (
        <ol>
            {storiesList}
        </ol>
    );
}
