import React, { useState, useEffect } from 'react';
import { StoriesList } from './StoriesList';
import { Pagination } from './Pagination';
import { FakeStoriesList } from '../- Placeholder Components -/FakeStoriesList';
import { getStories } from '../../Api Calls/apiCalls';

export function NewStories() {

    const [storiesData, setStoriesData] = useState({message: 'isLoading'});

    useEffect(() => {
        getStories('newstories')
            .then(res => 
                setStoriesData(res)
            )
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
                }[storiesData.message]  
            }
        </section>
    )
}