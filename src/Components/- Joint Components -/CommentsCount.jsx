import React from 'react'

export function CommentsCount({ descendants }) {

    if (descendants < 1) return (
        <p>no comments</p>
    );

    if (descendants === 1) return (
        <p>
            {`${descendants} comment`}
        </p>
    );

    return (
        <p>
           {`${descendants} comments`}
        </p>
    );
}
