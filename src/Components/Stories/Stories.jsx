import React, { useState, useEffect, useRef } from 'react';
import { StoriesList } from './StoriesList';
import { Pagination } from './Pagination';
import { FakeStoriesList } from '../- Placeholder Components -/FakeStoriesList';
import { StoryComments } from './StoryComments';
import { getStories } from '../../Api Calls/apiCalls';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import './Styles/Stories.css';

export function Stories({ storiesApiName }) {

    const { path } = useRouteMatch();

    const initialStoriesData = {status: 'isLoading'}

    const [storiesData, setStoriesData] = useState(initialStoriesData);

    const [pageNum, setPageNum] = useState(1);

    const [storiesPerPage, setStoriesPerPage] = useState(20);

    // Initial array of numbers for middle paginate buttons:
    const [midBtnsArr, setMidBtnsArr] = useState(
        Array.from(
            {length: 5}, (v ,i) => i + 2
        )
    );

    const handleSelectPageNum = num => {
        setPageNum(num);
    };

    const handleMidBtnsArr = array => {
        setMidBtnsArr(array)
    };

    /*Use this variable to prevent setting state on unmounted component, which
    happens when a user quickly clicks on different links on the navbar :*/
    const isMounted = useRef(true);

    /*If the component is unmounted before getStories function gets its data,
    we abort fetching data with Abort controler, also preventing state update: */ 
    const abortController = new AbortController();

    const abortSignal = abortController.signal;

    // If a user quickly clicks or navigates between navbar links:
    useEffect(() => {
        return () => {
            abortController.abort();
            isMounted.current = false;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setStoriesData(initialStoriesData);
        getStories(
            storiesApiName, 
            abortSignal, 
            pageNum, 
            storiesPerPage
        ).then(res => 
            isMounted.current && setStoriesData(res)
        ); 
        // If a user quickly clicks on a paginate button and then some nav link:
         return () => {
            abortController.abort();
        }     
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum, storiesApiName]);

    const { storiesArr, storiesCount, status } = storiesData;

    return (
        <section className='stories_with_comments'>
            {
                {
                    'isLoading': 
                        <React.Fragment>
                            <FakeStoriesList />
                        </React.Fragment>,
                    'error': <p className='error'>Network error. Please try again later.</p>,
                    'isLoaded': 
                        <Switch>
                            <Route exact path={path}>
                                <React.Fragment>
                                    <StoriesList 
                                        storiesArr={storiesArr}
                                        pageNum={pageNum}
                                        storiesPerPage={storiesPerPage}
                                    />
                                    <Pagination 
                                        pageNum={pageNum}
                                        storiesCount={storiesCount}
                                        handleSelectPageNum={handleSelectPageNum}
                                        midBtnsArr={midBtnsArr}
                                        handleMidBtnsArr={handleMidBtnsArr} 
                                        storiesPerPage={storiesPerPage}
                                    />
                                </React.Fragment>
                            </Route>
                            <Route path={`${path}/comments_on_:StoryId`}>
                                <StoryComments />
                            </Route>
                            <Route path='*'>
                                <h2>Invalid URL!</h2>
                            </Route>
                        </Switch>
                }[status]  
            }
        </section>
    )
}