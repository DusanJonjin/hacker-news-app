import React from 'react'

export function WebsiteImg({ url, urlShort }) {


    return (
        <iframe src={url}
                title={urlShort}
        >
        </iframe>
    )
}
