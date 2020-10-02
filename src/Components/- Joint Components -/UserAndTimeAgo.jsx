import React from 'react';

export function UserAndTimeAgo({ user='ja', timeAgo='1s ago' }) {
    return (
        <React.Fragment>
            <p>
                by: <span>{user}</span>
            </p>
            &ensp;|&ensp;
            <p>
                {timeAgo}
            </p>
        </React.Fragment>
    );
}
