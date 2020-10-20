import React from 'react';
import { 
    User,
    TimeAgo,
    Title,
    Text 
} from '../- Joint Components -/AllJointComponents';

export function CommentByTime(props) {

    const {
        user,
        time,
        storyUrl,
        title,
        text
    } = props;

    return (
        <div>
            <div>
                <User user={user}/>
                <TimeAgo time={time}/>
                    on: 
                        <Title 
                            storyUrl={storyUrl}
                            title={title}
                        />
            </div>
            <Text text={text} />
        </div>
    )
}
