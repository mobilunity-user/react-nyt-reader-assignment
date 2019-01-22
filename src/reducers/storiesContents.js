import { TOP_STORIES_REQUESTED, TOP_STORIES_FULFILLED } from '../actions/topStories';
import { STORY_REQUESTED, STORY_FULFILLED } from '../actions/storyContents';

const defaultState = {};

export function storiesContents(state = {...defaultState}, action) {
  const { type, story, contents } = action;

  switch (type) {
    case TOP_STORIES_REQUESTED:
    case TOP_STORIES_FULFILLED:
      return {...defaultState};
    case STORY_REQUESTED:
      return {
        ...state,
        [story.url]: []
      };
    case STORY_FULFILLED:
      return {
        ...state,
        [story.url]: contents
      };
    default:
      return state;
  }
}
