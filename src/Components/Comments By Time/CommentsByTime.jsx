import React, { useState, useEffect, useRef, useContext } from 'react';
import { CommentsByTimeList } from './CommentsByTimeList';
import { CommentsPaginate } from './CommentsPaginate';
import { FakeCommentsList } from '../- Placeholder Components -/FakeCommentsList';
import { getCommentsWithStories } from '../../Api Calls/apiCalls';
import { DarkThemeContext } from '../../Context/DarkThemeContext';
import './Styles/CommentsByTime.css'


export function CommentsByTime() {

    const { darkTheme } = useContext(DarkThemeContext);

    const [moreComments, setMoreComments] = useState([0, 1]);

    const initCommWithStoriesState = {status: 'isLoading', commentsAndStories: []};

    const [commentsWithStories, setCommentsWithStories] = useState(initCommWithStoriesState);

    const handleShowPrevNextComments = name => {
        if (name === 'previous') {
            setCommentsWithStories(initCommWithStoriesState);
            setMoreComments(prevMoreComments => 
                prevMoreComments.map(num =>
                    num - 1
                )
            )
        }
        else { 
            setCommentsWithStories(initCommWithStoriesState);
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
        getCommentsWithStories(moreComments, abortSignal).then(res => 
            isMounted.current && setCommentsWithStories(res)
        );
        window.scrollTo(0 ,0);
        return () => {
            abortController.abort()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [moreComments])

    const { status, commentsAndStories } = commentsWithStories;
    
    return (
        <section className={`comments-by-time ${darkTheme ? 'dark-by-time' : ''}`}>
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
                                commentsAndStories={commentsAndStories} 
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
