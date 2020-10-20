import React, { useState, useEffect, useRef } from 'react';
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

    //Prevents state update on an unmounted component:
    const isMounted = useRef(true);

    const abortController = new AbortController();

    const abortSignal = abortController.signal;
    
    useEffect(() => {
        return () => {
            abortController.abort();
            isMounted.current = false;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getAllComments(moreComments, abortSignal).then(res => 
            isMounted.current && setAllComments(res)
        );
        return () => {
            abortController.abort()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
