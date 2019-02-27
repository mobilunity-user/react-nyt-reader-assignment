import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fetching } from '../reducers/fetching';
import { sections } from '../reducers/sections';
import { sectionStories } from '../reducers/sectionStories';
import { selectedSection } from '../reducers/selectedSection';
import { selectedStory } from '../reducers/selectedStory';
import { stories } from '../reducers/stories';
import { storiesContents } from '../reducers/storiesContents';

const store = createStore(
  combineReducers({
    fetching, sections, sectionStories,
    selectedSection, selectedStory,
    stories, storiesContents
  }),
  applyMiddleware(
    thunkMiddleware
  )
);

export default store;
