import React from 'react';
import { CommentByTime } from './CommentByTime';

export function CommentsByTimeList({ comments }) {

    //Doing a recursion to find the title of the story on which the comment belongs:
    const findStoryObj = (arr, comment) => {
        const storyTitle = arr.reduce((acc, item) =>
            comment.parent === item.id ?
                item.parent ? findStoryObj(arr, item) : {...acc, ...item}
            : acc
    , {})
        return storyTitle;
    }

    const commentsList = comments.map((comment, i, arr) => 
        comment.parent &&
            <li key={comment.id}>
                <CommentByTime 
                    user={comment.by}
                    time={comment.time}
                    storyUrl={findStoryObj(arr, comment).url}
                    title={findStoryObj(arr, comment).title}
                    text={comment.text}
                />
            </li>
    );

    return (
        <ol>
            {commentsList}
        </ol>
    )
}
