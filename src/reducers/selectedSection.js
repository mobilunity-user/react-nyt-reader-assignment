import { TOP_STORIES_REQUESTED, TOP_STORIES_FULFILLED } from '../actions/topStories';
import { ROOT_REQUESTED, SECTION_REQUESTED, SECTION_FULFILLED } from '../actions/sectionStories';

const defaultState = null;

export function selectedSection(state = defaultState, action) {
  const { type, section } = action;

  switch (type) {
    case TOP_STORIES_REQUESTED:
    case TOP_STORIES_FULFILLED:
    case ROOT_REQUESTED:
      return defaultState;
    case SECTION_REQUESTED:
    case SECTION_FULFILLED:
      return section;
    default:
      return state;
  }
}
