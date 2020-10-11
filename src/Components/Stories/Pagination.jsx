import React from 'react'
import { useState } from 'react';
import './Styles/Pagination.css';

export function Pagination(
    { 
        pageNum, 
        storiesCount=500, 
        handleSelectPageNum, 
        storiesPerPage,
        disablePagination
    }) {

    const firstPageNum = 1;

    const lastPageNum = Math.ceil(storiesCount / storiesPerPage);

    /* Count of paginate buttons that find themself between buttons
    for first and last page: */
    const midBtnsCount = 5;

    const initialBtnsArr = Array.from(
        {length: midBtnsCount}, (v ,i) => i + 2
    );

    const [midBtnsArr, setMidBtnsArr] = useState(initialBtnsArr);


    const handleFirstPageNumSelect = () => {
        setMidBtnsArr(initialBtnsArr);
        handleSelectPageNum(firstPageNum);
    };

    const handleLastPageNumSelect = () => {
        setMidBtnsArr(
            Array.from(
                {length: midBtnsCount}, (v, i) => i + (lastPageNum - midBtnsCount)
            )
        );
        handleSelectPageNum(lastPageNum);
    };

    const numToChangeMidBtnsArr = 
        midBtnsCount % 2 === 0 ? midBtnsCount / 2
      : (midBtnsCount - 1) / 2
    ;

    const increaseMidBtnsArrValues = () => {
    //if the last value in midBtnsArr is equal to second to last page num do nothing:
        if (midBtnsArr[midBtnsArr.length - 1] === lastPageNum - 1) return;
        const increasedArrValues = midBtnsArr.map(num => 
            num + numToChangeMidBtnsArr
        );
        setMidBtnsArr(increasedArrValues);
    };

    const decreaseMidBtnsArrValues = () => {
        if (midBtnsArr[0] === firstPageNum + 1) return;
        const decreasedArrValues = midBtnsArr.map(num => 
            num - numToChangeMidBtnsArr
        );
        setMidBtnsArr(decreasedArrValues);
    };

    const handlePaginateBtnClick = (num, i, arr) => {
        if (num === pageNum) return;
        if (i === 0) decreaseMidBtnsArrValues();
        if (i === arr.length - 1) increaseMidBtnsArrValues();
        handleSelectPageNum(num);
    };

    const paginationBtns = midBtnsArr.map((num, i, arr) =>
        <li 
            key={num}
            className={`pagin-numbers ${num === pageNum ? 'pagin-num-selected' : ''}`}
            onClick={() => handlePaginateBtnClick(num, i, arr)}
        >
            {num}
        </li>
    );

    const displayThreeDots = {
        onStart: midBtnsArr[0] !== firstPageNum + 1,
        onEnd: midBtnsArr[midBtnsArr.length - 1] !== lastPageNum - 1
    }

    return (
        <div className={`pagination ${disablePagination ? 'pagin-disable' : ''}`}>
            <p 
                onClick={handleFirstPageNumSelect}
                className={`pagin-numbers ${pageNum === firstPageNum ? 'pagin-num-selected' : ''}`}
            >
                {firstPageNum}
            </p>
            {
                displayThreeDots.onStart && 
                    <p className='three-dots'>...</p>
            }
            <ol className='pagination-ol'>
                {paginationBtns}
            </ol>
            {
                displayThreeDots.onEnd && 
                    <p className='three-dots'>...</p>
            }
            <p 
                onClick={handleLastPageNumSelect}
                className={`pagin-numbers ${pageNum === lastPageNum ? 'pagin-num-selected' : ''}`}
            >
                {lastPageNum}
            </p>
        </div>
    )
}
