export const pageSizeOptionsData = () => {
	return ['18', '36', '63', '108'].map(value => {
		return {
			value: value,
			label: value
		};
	});
};

export const positionData = () => {
  // eslint-disable-next-line no-undef
  const { position } = drupalSettings;

  return Object.keys(position).map(keyName => {
    return {
      value: keyName,
      label: position[keyName]
    };
  });
};

export const departmentsData = () => {
  // eslint-disable-next-line no-undef
  const { departments } = drupalSettings;

  return Object.keys(departments).map(keyName => {
    return {
      value: keyName,
      label: departments[keyName]
    };
  });
};

export const graduateFieldsData = () => {
  // eslint-disable-next-line no-undef
  const { graduate_fields } = drupalSettings;

  return Object.keys(graduate_fields).map(keyName => {
    return {
      value: keyName,
      label: graduate_fields[keyName]
    };
  });
};

export const centersData = () => {
  // eslint-disable-next-line no-undef
  const { center_affiliations } = drupalSettings;

  return Object.keys(center_affiliations).map(keyName => {
    return {
      value: keyName,
      label: center_affiliations[keyName]
    };
  });
};

export const interestOptionsData = () => {
  // eslint-disable-next-line no-undef
  const { research_interests } = drupalSettings;

  return Object.keys(research_interests).map(keyName => {
    return {
      value: keyName,
      label: research_interests[keyName]
    };
  });
};

export const researchApproachesData = () => {
  // eslint-disable-next-line no-undef
  const { research_approaches } = drupalSettings;

  return Object.keys(research_approaches).map(keyName => {
    return {
      value: keyName,
      label: research_approaches[keyName]
    };
  });
};

/**
 * param drupalSettings.colleges - from titles of college
 * entity references
 *
 * Convert JSON object to array and sort by title in
 * alpha order
 *
 * @returns {{label: any, value: string}[]}
 */
export const collegesData = () => {
  // eslint-disable-next-line no-undef
  const { colleges } = drupalSettings;

  // create array out of object
  const collegeEntries = Object.entries(colleges);
  // sort by college value
  const orderedEntries = collegeEntries.sort((a, b) => a[1] > b[1] ? 1 : -1);
  // map the key / value pairs, index 0 is entity ID
  return orderedEntries.map(keyValues => {
    return {
      value: keyValues[0],
      label: keyValues[1]
    };
  });
};

export const petsData = () => {
  // eslint-disable-next-line no-undef
  const { pets } = drupalSettings;

  return Object.keys(pets).map(keyName => {
    return {
      value: keyName,
      label: pets[keyName]
    };
  });
};

export const coffeeData = () => {
  // eslint-disable-next-line no-undef
  const { coffee_or_tea } = drupalSettings;

  return Object.keys(coffee_or_tea).map(keyName => {
    return {
      value: keyName,
      label: coffee_or_tea[keyName]
    };
  });
};

export const tattooData = () => {
  // eslint-disable-next-line no-undef
  const { tattoos } = drupalSettings;

  return Object.keys(tattoos).map(keyName => {
    return {
      value: keyName,
      label: tattoos[keyName]
    };
  });
};
