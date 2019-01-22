import { filter, cloneDeep } from 'lodash';

export const ROOT_REQUESTED = 'ROOT_REQUESTED';
export const SECTION_REQUESTED = 'SECTION_REQUESTED';
export const SECTION_FULFILLED = 'SECTION_FULFILLED';

export const displaySection = section => async (dispatch, getState) => {
  const { stories, sectionStories } = getState();
  const { title, level } = section;
  let _sectionStories = sectionStories[title];

  dispatch({ type: SECTION_REQUESTED, section });

  if (!_sectionStories) {
    _sectionStories = cloneDeep(filter(stories, {
      [level ? 'subsection' : 'section']: title
    }));
  }

  dispatch({ type: SECTION_FULFILLED, section, stories: _sectionStories });
}

export const displayLastSection = () => async (dispatch, getState) => {
  const { selectedSection } = getState();

  if (!selectedSection) {
    dispatch({ type: ROOT_REQUESTED });
    return;
  }

  dispatch(displaySection(selectedSection));
}
