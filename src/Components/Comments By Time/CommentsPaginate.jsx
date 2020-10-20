import React from 'react';


export function CommentsPaginate({ showPrevNextComments, moreComments }) {

    return (       
        <div className='show-more'>
            {moreComments[0] > 0 && 
                <p onClick={() => showPrevNextComments('previous')}>
                    &lt; Previous comments
                </p>
            }
            <p onClick={() => showPrevNextComments('more')}>
                More comments &gt;
            </p>
        </div>       
    )
}
