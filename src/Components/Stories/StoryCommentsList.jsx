import React from 'react';
import { StoryComment } from './StoryComment';
import './Styles/StoryCommentsList.css';

export function StoryCommentsList({ comments }) {

    return (
        <ul className={`story-comments-ul`}>
            {
                comments.map(comment => 
                    <li 
                        key={comment.id}
                        className={`story-comments-li`}
                    >
                        <StoryComment 
                            user={comment.by}
                            time={comment.time}
                            text={comment.text}
                        />
                        {
                            comment?.comments.length > 0 &&
                                <StoryCommentsList comments={comment.comments} />
                        }
                    </li>
                )
            }
        </ul>
    )
}
