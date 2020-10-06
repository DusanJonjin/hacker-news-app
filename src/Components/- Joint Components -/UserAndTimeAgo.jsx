import React from 'react';
import { calculateTimeAgo } from '../../Utilities/functions';

export function UserAndTimeAgo({ user, time }) {

    const timeAgo = calculateTimeAgo(time);
    
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
