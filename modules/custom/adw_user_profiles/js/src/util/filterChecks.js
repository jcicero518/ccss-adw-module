/**
 * Array check for react-select references from filters. If multiple
 * values are present, concatenate them with , for AND, + for OR for contextual filters
 * otherwise return "all"
 *
 * @param values
 * @param delimiter optional - ENUM(,+)
 * @returns {string|*}
 */
export const checkFilterValues = (values, delimiter = ',') => {
  if (values && values.toString() === '') {
    return 'all';
  } else if (values) {
    if (values.length) {
      return values.map(val => val.value).join(delimiter);
    } else {
      return values.value;
    }
  }

  return 'all';
};

/**
 * String check only - returns keyword search string or
 * "all" for contextual filters
 *
 * @param value
 * @returns {string|*}
 */
export const checkKeywordFilter = value => {
  if (value !== '') {
    return value;
  }

  return 'all';
};
