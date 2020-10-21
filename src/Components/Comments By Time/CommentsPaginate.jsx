import React from 'react';
import './Styles/CommentsPaginate.css'


export function CommentsPaginate({ showPrevNextComments, moreComments }) {

    return (       
        <div className='comments-paginate'>
            {moreComments[0] > 0 && 
                <p onClick={() => showPrevNextComments('previous')}>
                    &lt; Previous
                </p>
            }
            <p onClick={() => showPrevNextComments('more')}>
                More &gt;
            </p>
        </div>       
    )
}
