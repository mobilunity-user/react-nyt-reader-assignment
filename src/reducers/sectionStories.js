import { TOP_STORIES_REQUESTED, TOP_STORIES_FULFILLED } from '../actions/topStories';
import { SECTION_REQUESTED, SECTION_FULFILLED } from '../actions/sectionStories';

const defaultState = {};

export function sectionStories(state = {...defaultState}, action) {
  const { type, section, stories } = action;

  switch (type) {
    case TOP_STORIES_REQUESTED:
    case TOP_STORIES_FULFILLED:
      return {...defaultState};
    case SECTION_REQUESTED:
      return {
        ...state,
        [section.title]: {}
      };
    case SECTION_FULFILLED:
      return {
        ...state,
        [section.title]: stories
      };
    default:
      return state;
  }
}
