import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunkMiddleware from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { fetching } from './reducers/fetching';
import { sections } from './reducers/sections';
import { sectionStories } from './reducers/sectionStories';
import { selectedSection } from './reducers/selectedSection';
import { stories } from './reducers/stories';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';

const store = createStore(
  combineReducers({
    fetching, sections, sectionStories,
    selectedSection, stories
  }),
  applyMiddleware(
    thunkMiddleware
  )
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
