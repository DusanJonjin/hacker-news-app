import React from 'react';
import {
    Title,
    WebsiteUrlShort,
    Score,
    UserAndTimeAgo,
    CommentsCount,
    WebsiteImg
} from '../- Joint Components -/AllJointComponents';
import { handleLongUrl } from '../../Utilities/functions';

export function Story({ storyObj }) {

    const {
        by,
        descendants,
        score,
        time,
        title,
        url
    } = storyObj

    const urlShort = handleLongUrl(url);

    return (
        <article>
            <div>
                <Title storyUrl={url}
                        title={title}/>
                <WebsiteUrlShort urlShort={urlShort} />
                <WebsiteImg url={url}
                            urlShort={urlShort}
                />
            </div> 
            <div>
                <Score score={score}/>
                <UserAndTimeAgo user={by}
                                time={time}/>
                <CommentsCount descendants={descendants}/>
            </div>
            
        </article>
    )
}
