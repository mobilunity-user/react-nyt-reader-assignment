import { TOP_STORIES_REQUESTED, TOP_STORIES_FULFILLED } from '../actions/topStories';

const defaultState = [];

export function sections(state = [...defaultState], action) {
  const { type, sections } = action;

  switch (type) {
    case TOP_STORIES_REQUESTED:
      return [...defaultState];
    case TOP_STORIES_FULFILLED:
      return [...sections];
    default:
      return state;
  }
}
