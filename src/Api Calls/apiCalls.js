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
export const getStoriesIDs = async (storiesName, abortSignal) =>  {
    const fetchStoriesIDs = await fetch(
        `https://hacker-news.firebaseio.com/v0/${storiesName}.json?print=pretty`,
        {signal: abortSignal}
    );
    const storiesIDsArray = await fetchStoriesIDs.json();
    return storiesIDsArray;
}


export const getStories = async (storiesName, abortSignal) => {
    
    try {
        const storiesIDsArr = await getStoriesIDs(storiesName, abortSignal);
        const getSlicedStories = storiesIDsArr.slice(0, 30).map(async storyID =>
             await getItem(storyID, abortSignal)
        );
        //Let array of promises be only one promise:
        const allStories = await Promise.all(getSlicedStories);
        //eliminate null or undefined values from array:
        const existingStories = allStories.filter(story => story);
        const storiesObject = {
            status: 'isLoaded', 
            storiesCount: storiesIDsArr.length, 
            storiesArr: existingStories
        };
        return storiesObject;
    }

    catch (err) {
        return {status: 'error'};
    }
};