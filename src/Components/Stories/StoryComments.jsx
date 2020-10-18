import React, { useState, useEffect, useRef, useContext } from 'react';
import { StoryCommentsDetails } from './StoryCommentsDetails';
import { StoryCommentsList } from './StoryCommentsList';
import { CommentsCount } from '../- Joint Components -/CommentsCount';
import { FakeCommentsList } from '../- Placeholder Components -/FakeCommentsList';
import { getStory, getStoryComments } from '../../Api Calls/apiCalls';
import { DarkThemeContext } from '../../Context/DarkThemeContext';
import { Link, useLocation } from 'react-router-dom';
import './Styles/StoryComments.css';

export function StoryComments(props) {

    const { darkTheme } = useContext(DarkThemeContext);

    const { pathname } = useLocation();

    const storyId = pathname.slice(pathname.lastIndexOf('_') + 1, pathname.length);

    const storiesType = pathname.slice(1, pathname.indexOf('_'));

    const [storyWithComments, setStoryWithComments] = useState({status: 'isLoading', story:''});

    const { status, story, comments } = storyWithComments;

    //Prevents state update on an unmounted component:
    const isMounted = useRef(true);

    const abortController = new AbortController();

    const abortSignal = abortController.signal;

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
            getStory(storyId, abortSignal).then(res => 
                isMounted.current && setStoryWithComments(res)
            );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storyId]);

    useEffect(() => {
        story?.kids && getStoryComments(story.kids, abortSignal).then(res => 
            isMounted.current && setStoryWithComments(prevStoryWithComments => {
                return {
                    ...prevStoryWithComments, 
                    status: 'storyAndCommentsLoaded',
                    comments: res
                }
            })
        );
        return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [story])

    return (
        <div className='story-comments-wrap'>
            <p className={`back-link`}>
                <Link 
                    to={`/${storiesType}_stories`}
                    className={`story-comments-link`}
                >
                    &lt;Back to {storiesType} stories
                </Link>
            </p>
            {
                {
                    'isLoading': 
                        <React.Fragment>
                            <p className={`fake-story-comm-details ${darkTheme ? 'fake-story-comm-det-dark' : ''}`}> </p>
                        </React.Fragment>,
                    'error': 
                        <p className='error'>Network error. Please try again later.</p>,
                    'storyLoaded':
                        <React.Fragment>
                            <div className={`details-comments-wrap ${darkTheme ? 'details-comm-wrap-dark' : ''}`}>
                                <StoryCommentsDetails 
                                    story={story}
                                    darkTheme={darkTheme}
                                />
                                <CommentsCount 
                                    descendants={story.descendants} 
                                />
                                <FakeCommentsList 
                                    commentsCount={story.descendants}
                                />
                            </div>
                        </React.Fragment>,
                    'storyAndCommentsLoaded':
                        <React.Fragment>
                            <div className={`details-comments-wrap ${darkTheme ? 'details-comm-wrap-dark' : ''}`}>
                                <StoryCommentsDetails 
                                    story={story}
                                    darkTheme={darkTheme}
                                />
                                <CommentsCount 
                                    descendants={story.descendants} 
                                />
                                <StoryCommentsList comments={comments} />
                            </div>
                        </React.Fragment>
                }[status]
            }
        </div>
        
    );
}

