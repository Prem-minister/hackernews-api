import React from 'react';
import {act} from 'react-dom/test-utils';
import {render, cleanup, waitFor} from '@testing-library/react';
import {App} from '../App';
import {storyIds, singularStory} from '../fixtures';
import {getStory, getStoryIds} from '../services/hacknApi';
import {useInfiniteScroll} from '../hooks/useInfiniteScroll';
import { STORY_INCIDENT } from '../constants';

beforeEach(cleanup);

jest.mock('../hooks/useInfiniteScroll.js');

jest.mock('../services/hacknApi', () => ({
   getStory: jest.fn(),
   getStoryIds: jest.fn(),
}));

test('renders the app' , async () => {
    useInfiniteScroll.mockImplementation(()=>({
        count: STORY_INCIDENT,
    }));

    getStory.mockImplementation(()=> Promise.resolve(singularStory));
    getStoryIds.mockImplementation(()=> Promise.resolve(storyIds));
    

    await act(async () => {
        const {getByText, queryByTestId} = render(<App/>);
        await waitFor(()=> [
            expect(getByText('Hacker News Stories')).toBeTruthy(),
            expect(getByText('Tarnished: Google Response')).toBeTruthy(),
            expect(queryByTestId('story-by').textContent).toEqual('By: Premsharaan'),
        ]);
    });
});