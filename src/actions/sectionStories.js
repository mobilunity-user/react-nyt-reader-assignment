import { filter, cloneDeep } from 'lodash';

export const SECTION_SELECTED = 'SECTION_SELECTED';
export const SECTION_REQUESTED = 'SECTION_REQUESTED';
export const SECTION_FULFILLED = 'SECTION_FULFILLED';

export const displaySection = section => async (dispatch, getState) => {
  const { stories, sectionStories } = getState();
  const { title, level } = section;
  let _sectionStories = sectionStories[title];

  dispatch({ type: SECTION_SELECTED, section });

  if (_sectionStories) {
    return;
  }

  dispatch({ type: SECTION_REQUESTED, section });

  _sectionStories = cloneDeep(filter(stories, {
    [level ? 'subsection' : 'section']: title
  }));

  dispatch({ type: SECTION_FULFILLED, section, stories: _sectionStories });
}

export const displayAll = () => async (dispatch) => {
  dispatch({ type: SECTION_SELECTED, section: null });
}

export const displayLastOpened = () => async (dispatch, getState) => {
  const { selectedSection } = getState();

  if (!selectedSection) {
    dispatch(displayAll());
    return;
  }

  dispatch(displaySection(selectedSection));
}
