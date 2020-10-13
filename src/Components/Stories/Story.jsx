import React, { useContext } from 'react';
import {
    Title,
    WebsiteUrlShort,
    Score,
    User,
    TimeAgo,
    CommentsCount
} from '../- Joint Components -/AllJointComponents';
import { handleLongUrl } from '../../Utilities/functions';
import { DarkThemeContext } from '../../Context/DarkThemeContext';
import './Styles/Story.css'

export function Story({ storyObj, storyNum }) {

    const { darkTheme } = useContext(DarkThemeContext);

    const {
        by,
        descendants,
        score,
        time,
        title,
        url
    } = storyObj

    const urlShort = handleLongUrl(url);

    return (
        <article className={`story ${darkTheme ? 'dark-story' : ''}`}>
            <p className={`story-num ${darkTheme ? 'dark-story-num' : ''}`}>
                {storyNum}
            </p>
            <div className={`story-top-wrap ${darkTheme ? 'top-wrap-dark' : ''}`}>
                <Title 
                    storyNum={storyNum}
                    storyUrl={url}
                    title={title}
                    darkTheme={darkTheme}
                />
                <WebsiteUrlShort 
                    urlShort={urlShort}
                    darkTheme={darkTheme}
                />
            </div> 
            <div className={`story-bottom-wrap ${darkTheme ? 'bot-wrap-dark' : ''}`}>
                <div className={`small-wrap-one`}>
                    <Score score={score}/>
                    &ensp;|&ensp;
                    <User user={by} />
                </div>              
                <div className={`small-wrap-two`}>
                    <TimeAgo time={time} />
                    &ensp;|&ensp;
                    <CommentsCount 
                        descendants={descendants}
                        darkTheme={darkTheme}
                    />
                </div>
            </div>
            
        </article>
    )
}
