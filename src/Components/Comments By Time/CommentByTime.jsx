import React from 'react';
import { 
    User,
    TimeAgo,
    Title,
    Text 
} from '../- Joint Components -/AllJointComponents';

export function CommentByTime() {

    return (
        <div>
            <div>
                <User />
                <TimeAgo />
                 on: <Title />
            </div>
            <Text />
        </div>
    )
}
