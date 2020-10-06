import React from 'react';
import  { Story } from './Story';

export function StoriesList({storiesArr}) {
    
    const storiesList = storiesArr.map(story => 
        <li key={story.id}>
            <Story storyObj={story} />
        </li>
    )
    return (
        <ol>
            {storiesList}
        </ol>
    );
}
