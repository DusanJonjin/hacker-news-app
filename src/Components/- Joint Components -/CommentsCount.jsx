import React from 'react'

export function CommentsCount({ descendants, darkTheme }) {

    if (descendants < 1) return (
        <p className={`no-comments ${darkTheme ? 'dark-no-comments' : ''}`}>
            no comments
        </p>
    );

    if (descendants === 1) return (
        <p className={`comments-exist ${darkTheme ? 'dark-comments-exist' : ''}`}>
            {`${descendants} comment`}
        </p>
    );

    return (
        <p className={`comments-exist ${darkTheme ? 'dark-comments-exist' : ''}`} >
           {`${descendants} comments`}
        </p>
    );
}
