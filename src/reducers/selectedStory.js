import { TOP_STORIES_REQUESTED, TOP_STORIES_FULFILLED } from '../actions/topStories';
import { ROOT_REQUESTED, SECTION_REQUESTED, SECTION_FULFILLED } from '../actions/sectionStories';
import { STORY_REQUESTED, STORY_FULFILLED } from '../actions/storyContents';

const defaultState = null;

export function selectedStory(state = defaultState, action) {
  const { type, story } = action;

  switch (type) {
    case TOP_STORIES_REQUESTED:
    case TOP_STORIES_FULFILLED:
    case SECTION_REQUESTED:
    case SECTION_FULFILLED:
    case ROOT_REQUESTED:
      return defaultState;
    case STORY_REQUESTED:
    case STORY_FULFILLED:
      return story;
    default:
      return state;
  }
}
