import React from 'react';
import {
    Title,
    WebsiteShortUrl,
    Score,
    UserAndTimeAgo
} from '../- Joint Components -/AllJointComponents';

export function StoryCommentsDetails() {
    return (
        <article>
            <Title />
            <WebsiteShortUrl />
            <div>
                <Score />
                <UserAndTimeAgo />
            </div>
        </article>
    );
}
