import React from 'react';
import { 
    UserAndTimeAgo,
    Title,
    Text 
} from '../- Joint Components -/AllJointComponents';

export function CommentByTime() {

    return (
        <div>
            <div>
                <UserAndTimeAgo />
                 on: <Title />
            </div>
            <Text />
        </div>
    )
}
