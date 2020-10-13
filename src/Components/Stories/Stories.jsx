import React, { useState, useEffect, useRef } from 'react';
import { StoriesList } from './StoriesList';
import { Pagination } from './Pagination';
import { FakeStoriesList } from '../- Placeholder Components -/FakeStoriesList';
import { getStories } from '../../Api Calls/apiCalls';
import './Styles/Stories.css';

export function Stories({ storiesApiName }) {

    const initialStoriesData = {status: 'isLoading'}

    const [storiesData, setStoriesData] = useState(initialStoriesData);

    const [pageNum, setPageNum] = useState(1);

    const [storiesPerPage, setStoriesPerPage] = useState(20);

    const handleSelectPageNum = num => {
        setPageNum(num);
    };

    /*Use this variable to prevent setting state on unmounted component, which
    happens when a user quickly clicks on different links on the navbar :*/
    const isMounted = useRef(true);

    /*If the component is unmounted before getStories function gets its data,
    we abort fetching data with Abort controler, also preventing state update: */ 
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
        setStoriesData(initialStoriesData);
        getStories(
            storiesApiName, 
            abortSignal, 
            pageNum, 
            storiesPerPage
        ).then(res => 
            isMounted.current && setStoriesData(res)
        ); 
        // If user quickly clicks on a paginate button and then some nav link:
         return () => {
            abortController.abort();
        }     
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum, storiesApiName]);

    const { storiesArr, storiesCount, status } = storiesData;

    const disablePagination = status === 'isLoading';

    return (
        <section className='stories'>
            {
                {
                    'isLoading': 
                        <React.Fragment>
                            <FakeStoriesList />
                            <Pagination 
                                pageNum={pageNum}
                                storiesPerPage={storiesPerPage}
                                disablePagination={disablePagination}
                            />
                        </React.Fragment>,
                    'error': <p className='error'>Network error. Please try again later.</p>,
                    'isLoaded': 
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
                                storiesPerPage={storiesPerPage}
                                disablePagination={disablePagination}
                            />
                        </React.Fragment>
                }[status]  
            }
        </section>
    )
}