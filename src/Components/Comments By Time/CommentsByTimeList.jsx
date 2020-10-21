import React from 'react';
import { CommentByTime } from './CommentByTime';
import './Styles/CommentsByTimeList.css'

export function CommentsByTimeList({ commentsAndStories }) {

    //Doing a recursion to find the title of the story in which the comment belongs:
    const findStoryObj = (commAndStories, commObj) => {
        const storyTitle = commAndStories.reduce((acc, item) =>
            commObj.parent === item.id ?
                item.parent ? findStoryObj(commAndStories, item) : {...acc, ...item}
            : acc
    , {})
        return storyTitle;
    }

    const commentsList = commentsAndStories.map((commObj, i, arr) => 
        //show comments only (comments have parent property):
        commObj.parent &&
            <li key={commObj.id} className='comments-by-time-li'>
                <CommentByTime 
                    user={commObj.by}
                    time={commObj.time}
                    storyUrl={findStoryObj(arr, commObj).url}
                    title={findStoryObj(arr, commObj).title}
                    text={commObj.text}
                />
            </li>
    );

    return (
        <ol className='comments-by-time-ol'>
            {commentsList}
        </ol>
    )
}
