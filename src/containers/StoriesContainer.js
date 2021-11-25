import React, { useEffect, useState } from 'react';
import { getStoryIds } from '../services/hacknApi';
import { Story } from '../components/Story';
import { GlobalStyle, StoriesContainerWrapper } from '../styles/StoriesContainerStyles';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';


export const StoriesContainer = () => {
    const {count} = useInfiniteScroll;
    const [storyIds, setStoryIds] = useState([]);
   

    useEffect(() => {
        getStoryIds().then(data => setStoryIds(data));
        console.log('count', count);
        //getStory(20970623).then(data => console.log(data));
    }, [count]);

    // [] = when the component mounts, do this...
    //[storyIdsUpdated (true/false)]
    return (
        <>
            <GlobalStyle/>
                <StoriesContainerWrapper data-test-id="stories-container">
                    <h1>Hacking News Stories</h1>
                    {storyIds.slice(0, count).map(storyId => (<Story key={storyId} storyId={storyId} />))}
                </StoriesContainerWrapper>
        </>
    );
};
