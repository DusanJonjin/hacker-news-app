/* Async function to get items (comments and stories have unique ids,
which we put in this api call, and then get them back from server): */
export const getItem = async (itemID, abortSignal) => {
    const fetchItem = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${itemID}.json?print=pretty`,
        {signal: abortSignal}
    );
    const item = await fetchItem.json();
    return item;
};

// Async function to get all top stories or new stories id's in array:
export const getStoriesIDs = async (storiesApiName, abortSignal) =>  {
    const fetchStoriesIDs = await fetch(
        `https://hacker-news.firebaseio.com/v0/${storiesApiName}.json?print=pretty`,
        {signal: abortSignal}
    );
    const storiesIDsArray = await fetchStoriesIDs.json();
    return storiesIDsArray;
}


export const getStory = async storyID => {
    try {
        const fetchedStory = await getItem(storyID);
        const storyObj = {
            status: 'storyLoaded',
            story: fetchedStory
        }
        return storyObj;
    }

    catch(err) {
        return {status: 'error'}
    }
};


export const getStories = async (storiesApiName, abortSignal, pageNum, storiesPerPage) => {
    try {
        const storiesIDsArr = await getStoriesIDs(storiesApiName, abortSignal);
        const storiesToNum = pageNum * storiesPerPage;
        const storiesFromNum = storiesToNum - storiesPerPage;
        const getSlicedStories = storiesIDsArr.slice(
            storiesFromNum, storiesToNum).map(async storyID =>
                await getItem(storyID, abortSignal)
        );
        //Let array of promises be only one promise:
        const allStories = await Promise.all(getSlicedStories);
        //Eliminate null or undefined values from array:
        const existingStories = allStories.filter(story => story);
        const storiesObject = {
            status: 'isLoaded', 
            storiesCount: storiesIDsArr.length, 
            storiesArr: existingStories
        };
        return storiesObject;
    }

    catch (err) {
        if (err.name === 'AbortError') return {status: 'isLoading'};
        return {status: 'error'};
    }
};


export const getStoryComments = async (storyKids, abortSignal) => {
    try {
        if (!storyKids || storyKids === []) return [];
        const fetchAllComments = storyKids.map(async commentID => {
            const comment = await getItem(commentID, abortSignal);
            if (!comment) return null;
            //Do a recursion to get all deeply nested comments (replies):
            const comments = await getStoryComments(comment.kids, abortSignal);
            const commentObj = {
                ...comment,
                comments: comments
            };
            return commentObj;
        })
        const allCommentsResult = await Promise.all(fetchAllComments);
        //Filter out all badly formatted or unexisting comments:
        const filteredComments = allCommentsResult.filter(comment => 
            comment && !comment.dead && !comment.deleted
        );
        return filteredComments;
    }

    catch(err) {
        return {status: 'error'};
    }
};