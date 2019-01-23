import { assign, pickBy, startsWith, mapKeys, toString, toNumber, isBoolean, isString, lowerCase, every } from 'lodash';

function Env(key, defaultValue = undefined) {
  const envKey = `${Env.PREFIX}${key}`;

  if (envKey in process.env) {
    return process.env[envKey];
  }

  return defaultValue;
}

assign (Env, {
  get PREFIX() {
    return 'REACT_APP_';
  },

  get all() {
    const { PREFIX } = this;

    return mapKeys(pickBy(process.env, (_, key) =>
      startsWith(key, PREFIX)), (_, key) =>
      key.replace(PREFIX, '')
    );
  },

  string(key, defaultValue = '') {
    const value = this(key, defaultValue);

    return toString(value);
  },

  number(key, defaultValue = '') {
    const value = this(key, defaultValue);

    return toNumber(value);
  },

  bool(key, defaultValue = '') {
    const value = this(key, defaultValue);

    if (isBoolean(value)) {
      return value;
    } else if (isString(value)) {
      const _value = lowerCase(value);

      return every(
        ["0", "false", "off"],
        sample => _value !== sample
      );
    }

    return !!value;
  }
});

export default Env;
