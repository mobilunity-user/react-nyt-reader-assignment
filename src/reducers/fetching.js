import { TOP_STORIES_REQUESTED, TOP_STORIES_FULFILLED } from '../actions/topStories';
import { SECTION_REQUESTED, SECTION_FULFILLED } from '../actions/sectionStories';
import { STORY_REQUESTED, STORY_FULFILLED } from '../actions/storyContents';

const defaultState = false;

export function fetching(state = defaultState, action) {
  const { type } = action;

  switch (type) {
    case TOP_STORIES_REQUESTED:
    case SECTION_REQUESTED:
    case STORY_REQUESTED:
      return true;
    case TOP_STORIES_FULFILLED:
    case SECTION_FULFILLED:
    case STORY_FULFILLED:
      return false;
    default:
      return state;
  }
}
