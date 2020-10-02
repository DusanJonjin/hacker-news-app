import React from 'react';
import {
    Title,
    WebsiteUrlShort,
    Score,
    UserAndTimeAgo,
    CommentsCount,
    WebsiteImg
} from '../- Joint Components -/AllJointComponents';

export function Story() {
    return (
        <article>
            <div>
                <Title />
                <WebsiteUrlShort />
            </div> 
            <div>
                <Score />
                <UserAndTimeAgo />
                <CommentsCount />
            </div>
            
        </article>
    )
}
