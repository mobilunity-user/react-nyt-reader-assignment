import { flow } from 'lodash';

export const compose = flow;

export function withPropTypes(propTypes = {}) {
  return function (componentFn) {
    Object.defineProperty(componentFn, 'propTypes', {
      enumerable: true, get() { return propTypes; }
    });

    return componentFn;
  }
};

export default { compose, withPropTypes };
