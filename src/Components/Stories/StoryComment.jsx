import React from 'react'
import { User, TimeAgo, Text } from '../- Joint Components -/AllJointComponents';
import './Styles/StoryComment.css'

export function StoryComment({ user, time, text}) {

    return (
        <article className={`story-comment`}>
            <div className={`story-comment-top-wrap`}>
                <User user={user} />&nbsp;
                <TimeAgo time={time}/>
            </div>
            <div className={`story-comment-bot-wrap`}>
                <Text text={text} />
            </div>
        </article>
    )
}
