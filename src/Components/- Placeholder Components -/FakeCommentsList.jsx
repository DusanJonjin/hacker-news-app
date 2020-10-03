import React from 'react';
import { FakeComment } from './FakeComment';

export function FakeCommentsList() {

    //Create an arbitary array of thirty values 
    const fakeCommentsArr = Array.from({length: 30}, (v, i) => i);

    const fakeCommentsList = fakeCommentsArr.map(num => 
        <li key={num}>
            <FakeComment />
        </li>
    );

    return (
        <ul>
            {fakeCommentsList}
        </ul>
    )
}