import { flow } from 'lodash';

const setStatic = (key, value) => BaseComponent => {
  BaseComponent[key] = value
  return BaseComponent;
};

export const compose = flow;

export const withPropTypes = propTypes => setStatic('propTypes', propTypes);

export default { compose, withPropTypes };
