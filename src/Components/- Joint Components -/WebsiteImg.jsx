import React from 'react'

export function WebsiteImg({ websiteUrl }) {

    const { url, urlShort } = websiteUrl;

    return (
        <iframe src={url}
                title={urlShort}
        >
        </iframe>
    )
}
