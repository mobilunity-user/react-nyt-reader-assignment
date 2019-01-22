import { topStories } from '../api/nyt';

export const TOP_STORIES_REQUESTED = 'TOP_STORIES_REQUESTED';
export const TOP_STORIES_FULFILLED = 'TOP_STORIES_FULFILLED';

export const fetchStories = () => async dispatch => {
  let stories, sections;

  dispatch({ type: TOP_STORIES_REQUESTED });
  ({ stories, sections } = await topStories());
  dispatch({ type: TOP_STORIES_FULFILLED, stories, sections });
}
