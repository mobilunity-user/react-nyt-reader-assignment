import { TOP_STORIES_REQUESTED, TOP_STORIES_FULFILLED } from '../actions/topStories';
import { SECTION_SELECTED } from '../actions/sectionStories';
import { STORY_SELECTED } from '../actions/storyContents';

const defaultState = null;

export function selectedStory(state = defaultState, action) {
  const { type, story } = action;

  switch (type) {
    case TOP_STORIES_REQUESTED:
    case TOP_STORIES_FULFILLED:
    case SECTION_SELECTED:
      return defaultState;
    case STORY_SELECTED:
      return story;
    default:
      return state;
  }
}
