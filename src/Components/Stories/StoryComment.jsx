import React, { useContext } from  'react'
import { User, TimeAgo, Text } from '../- Joint Components -/AllJointComponents';
import { DarkThemeContext } from '../../Context/DarkThemeContext';
import './Styles/StoryComment.css'

export function StoryComment({ user, time, text }) {

    const { darkTheme } = useContext(DarkThemeContext);

    return (
        <article className={`story-comment ${darkTheme ? 'story-comment-dark' : ''}`}>
            <div className={`story-comment-top-wrap ${darkTheme ? 'story-comm-top-wrap-dark' : ''}`}>
                <User user={user} />&nbsp;
                <TimeAgo time={time}/>
            </div>
            <div className={`story-comment-bot-wrap ${darkTheme ? 'story-comm-bot-wrap-dark' : ''}`}>
                <Text text={text} />
            </div>
        </article>
    )
}
