import React from 'react';
import  { Story } from './Story';

import './Styles/StoriesList.css';

export function StoriesList({storiesArr}) {
    
    const storiesList = storiesArr.map(story => 
        <li key={story.id}
            className={`stories-li`}>
            <Story storyObj={story} />
        </li>
    )
    return (
        <ol className='stories-ol'>
            {storiesList}
        </ol>
    );
}
