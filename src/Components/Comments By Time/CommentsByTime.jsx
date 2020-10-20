import React, { useState, useEffect } from 'react';
import { CommentsByTimeList } from './CommentsByTimeList';
import { CommentsPaginate } from './CommentsPaginate';
import { FakeCommentsList } from '../- Placeholder Components -/FakeCommentsList';
import { getAllComments } from '../../Api Calls/apiCalls';


export function CommentsByTime() {

    const [moreComments, setMoreComments] = useState([0, 1]);

    const initialCommentsState = {status: 'isLoading', comments: []};

    const [allComments, setAllComments] = useState(initialCommentsState);

    const handleShowPrevNextComments = name => {
        if (name === 'previous') {
            setAllComments(initialCommentsState);
            setMoreComments(prevMoreComments => 
                prevMoreComments.map(num =>
                    num - 1
                )
            )
        }
        else { 
            setAllComments(initialCommentsState);
            setMoreComments(prevMoreComments => 
            prevMoreComments.map(num => 
                num + 1
            ));
        }
    };

    useEffect(() => {
        getAllComments(moreComments).then(res => {
            setAllComments(res);
        });
    }, [moreComments])

    const { status, comments } = allComments;
    
    return (
        <section>
            {
                {
                    'isLoading':
                        <FakeCommentsList />,
                    'error':
                         <p className='error'>
                            Network error. Refresh the browser, or try again later.
                        </p>,
                    'isLoaded':
                        <React.Fragment>
                            <CommentsByTimeList
                                comments={comments} 
                            />
                            <CommentsPaginate 
                                moreComments={moreComments}
                                showPrevNextComments={handleShowPrevNextComments}
                            />
                        </React.Fragment>
                }[status]
            }              
        </section>
    )
}
