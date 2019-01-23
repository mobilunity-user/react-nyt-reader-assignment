import { TOP_STORIES_REQUESTED, TOP_STORIES_FULFILLED } from '../actions/topStories';
import { SECTION_SELECTED } from '../actions/sectionStories';

const defaultState = null;

export function selectedSection(state = defaultState, action) {
  const { type, section } = action;

  switch (type) {
    case TOP_STORIES_REQUESTED:
    case TOP_STORIES_FULFILLED:
      return defaultState;
    case SECTION_SELECTED:
      return section;
    default:
      return state;
  }
}
