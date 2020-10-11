import React, { useState, useEffect, useRef } from 'react';
import { StoriesList } from './StoriesList';
import { Pagination } from './Pagination';
import { FakeStoriesList } from '../- Placeholder Components -/FakeStoriesList';
import { getStories } from '../../Api Calls/apiCalls';
import './Styles/Stories.css';

export function TopStories() {

    const [storiesData, setStoriesData] = useState({status: 'isLoading'});

    /*Use this variable to prevent setting state on unmounted component, which
    happens when a user quickly clicks on different links on the navbar :*/
    const isMounted = useRef(true);

    /*If the component is unmounted before getStories function gets its data,
    we abort fetching data with Abort controler, also preventing state update: */ 
    useEffect(() => {
        const abortController = new AbortController();
        const abortSignal = abortController.signal;
        getStories('topstories', abortSignal).then(res => 
            isMounted.current && setStoriesData(res)
        );      
        return () => {
            isMounted.current = false;
            abortController.abort();
        }
    }, [])

    const { storiesArr } = storiesData;

    return (
        <section className='stories'>
            {
                {
                    'isLoading': <FakeStoriesList />,
                    'error': <p className='error'>Network error. Please try again later.</p>,
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