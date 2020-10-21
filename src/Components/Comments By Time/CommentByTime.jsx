import React, { useContext } from 'react';
import { 
    User,
    TimeAgo,
    Title,
    Text 
} from '../- Joint Components -/AllJointComponents';
import { DarkThemeContext } from '../../Context/DarkThemeContext';
import './Styles/CommentByTime.css';

export function CommentByTime(props) {

    const {
        user,
        time,
        storyUrl,
        title,
        text
    } = props;

    const { darkTheme } = useContext(DarkThemeContext);

    return (
        <article className={`story-comment ${darkTheme ? 'story-comment-dark' : ''}`}>
            <div className={`story-comment-top-wrap ${darkTheme ? 'story-comm-top-wrap-dark' : ''}`}>
                <User user={user}/>&nbsp;
                <TimeAgo time={time}/>&nbsp;on:&nbsp;
                        <Title 
                            storyUrl={storyUrl}
                            title={title}
                            darkTheme={darkTheme}
                        />
            </div>
            <div className={`story-comment-bot-wrap ${darkTheme ? 'story-comm-bot-wrap-dark' : ''}`}>
                <Text text={text} />
            </div>
        </article>
    )
}
