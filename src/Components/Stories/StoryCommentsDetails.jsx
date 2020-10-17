import React from 'react';
import {
    Title,
    WebsiteUrlShort,
    Score,
    User,
    TimeAgo
} from '../- Joint Components -/AllJointComponents';
import { handleLongUrl } from '../../Utilities/functions';
import './Styles/StoryCommentsDetails.css';

export function StoryCommentsDetails({ story }) {

    const {
        url,
        title,
        score,
        by,
        time
    } = story;

    const urlShort = handleLongUrl(url);

    return (
        <article className={`story-comm-details-box`}>
            <Title 
                storyUrl={url}
                title={title}
            />
            <WebsiteUrlShort 
                urlShort={urlShort}/>
            <div className='story-comm-details-bot-wrap'>
                <div>
                    <Score score={score}/>&ensp;|&ensp;
                    <User 
                        user={by}
                        byWord='by:'
                    />
                </div>
                <TimeAgo time={time}/>
            </div>
        </article>
    );
}
