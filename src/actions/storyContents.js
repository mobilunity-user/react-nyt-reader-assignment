import { storyContents } from '../api/nyt';

export const STORY_SELECTED = 'STORY_SELECTED';
export const STORY_REQUESTED = 'STORY_REQUESTED';
export const STORY_FULFILLED = 'STORY_FULFILLED';

export const displayStory = story => async (dispatch, getState) => {
  const { storiesContents } = getState();
  const { url } = story;
  let contents = storiesContents[url];

  dispatch({ type: STORY_SELECTED, story });

  if (contents) {
    return;
  }

  dispatch({ type: STORY_REQUESTED, story });
  contents = await storyContents(url);
  dispatch({ type: STORY_FULFILLED, story, contents });
}
