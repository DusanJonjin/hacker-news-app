import React from 'react';
import { StoryCommentsDetails } from './StoryCommentsDetails';
import { StoryCommentsList } from './StoryCommentsList';
import { CommentsCount } from '../- Joint Components -/CommentsCount';

export function StoryComments(props) {

    return (
        <section>
            <p>&lnsq;Back to stories</p>
            <StoryCommentsDetails />
            <CommentsCount />
            <StoryCommentsList />
        </section>
    );
}
