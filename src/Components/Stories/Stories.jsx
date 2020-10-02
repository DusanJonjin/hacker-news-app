import React from 'react';
import { StoriesList } from './StoriesList';
import { Pagination } from './Pagination';

export function Stories(props) {

    return (
        <section className='stories'>
            <StoriesList />
            <Pagination />
        </section>
    )
}
