import React, { useState, useEffect, useRef } from 'react';
import { StoriesList } from './StoriesList';
import { Pagination } from './Pagination';
import { FakeStoriesList } from '../- Placeholder Components -/FakeStoriesList';
import { getStories } from '../../Api Calls/apiCalls';
import './Styles/Stories.css';

export function TopStories() {

    const [storiesData, setStoriesData] = useState({status: 'isLoading'});

    const [pageNum, setPageNum] = useState(1);

    const [storiesPerPage, setStoriesPerPage] = useState(30);

    const handleSelectPageNum = num => {
        setPageNum(num);
        setStoriesData({status: 'isLoading'});
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
            isMounted.current = false;
            abortController.abort();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum]);

    useEffect(() => {
        getStories(
            'topstories', 
            abortSignal, 
            pageNum, 
            storiesPerPage
        ).then(res => 
            setStoriesData(res)
        );      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum]);

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
                            <StoriesList storiesArr={storiesArr}/>
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