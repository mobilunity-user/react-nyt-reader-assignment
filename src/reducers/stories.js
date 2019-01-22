import { TOP_STORIES_REQUESTED, TOP_STORIES_FULFILLED } from '../actions/topStories';

const defaultState = [];

export function stories(state = [...defaultState], action) {
  const { type, stories } = action;

  switch (type) {
    case TOP_STORIES_REQUESTED:
      return [...defaultState];
    case TOP_STORIES_FULFILLED:
      return [...stories];
    default:
      return state;
  }
}
