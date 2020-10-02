import React from 'react';
import ReactMarkdown from 'react-markdown';

export function Text({ text }) {

    return (
        <div>
            <ReactMarkdown src={text} 
                           className='markdown'
            />
        </div>
    );
}
