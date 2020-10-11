import React, { useState, useEffect, useRef } from 'react';
import { StoriesList } from './StoriesList';
import { Pagination } from './Pagination';
import { FakeStoriesList } from '../- Placeholder Components -/FakeStoriesList';
import { getStories } from '../../Api Calls/apiCalls';
import './Styles/Stories.css';

export function NewStories() {

    const [storiesData, setStoriesData] = useState({status: 'isLoading'});

    const isMounted = useRef(true);

    useEffect(() => {
        const abortController = new AbortController();
        const abortSignal = abortController.signal;
        getStories('newstories', abortSignal).then(res => 
            isMounted.current && setStoriesData(res)
        );
        return () => {
            isMounted.current = false;
            abortController.abort();
        }
    }, []);

    const { storiesArr } = storiesData;

    return (
        <section className='stories'>
            {
                {
                    'isLoading': <FakeStoriesList />,
                    'error': <p>Network error. Please try again later.</p>,
                    'isLoaded': 
                        <React.Fragment>
                            <StoriesList storiesArr={storiesArr}/>
                            <Pagination />
                        </React.Fragment>
                }[storiesData.status]  
            }
        </section>
    )
}