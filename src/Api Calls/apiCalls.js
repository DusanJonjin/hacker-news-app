/* Async function to get items (comments and stories have unique ids,
which we put in this api call, and then get them back from server): */
export const getItem = async itemID => {
    const fetchItem = await fetch(`https://hacker-news.firebaseio.com/v0/item/${itemID}.json?print=pretty`);
    const item = await fetchItem.json();
    return item;
};

// Async function to get all top stories or new stories id's in array:
export const getStoriesIDs = async storiesName =>  {
    const fetchStoriesIDs = await fetch(`https://hacker-news.firebaseio.com/v0/${storiesName}.json?print=pretty`);
    const storiesIDsArray = await fetchStoriesIDs.json();
    return storiesIDsArray;
}


export const getStories = async storiesName => {
    
    try {
        const storiesIDsArr = await getStoriesIDs(storiesName);
        const getSlicedStories = storiesIDsArr.slice(0, 30).map(async storyID =>
                await getItem(storyID)
        );
        //Get all promises and make them to be just one promise:
        const allStories = await Promise.all(getSlicedStories);
        //eliminate null or undefined values from array:
        const existingStories = allStories.filter(story => story);
        const storiesObject = {
            message: 'isLoaded', 
            storiesCount: storiesIDsArr.length, 
            storiesArr: existingStories
        };
        return storiesObject;
    }

    catch (err) {
        return {message: 'error'};
    }
};