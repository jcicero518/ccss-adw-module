import React, { useState } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import Select, { components } from 'react-select';
import makeAnimated from 'react-select/animated';

import { useCurrentWidth } from 'react-socks';
import {
  departmentsData,
  collegesData,
  positionData,
  graduateFieldsData,
  centersData,
  researchApproachesData,
  interestOptionsData,
  petsData,
  coffeeData,
  tattooData
} from '../util/filterData';

// eslint-disable-next-line no-unused-vars
const getWidth = () => window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

/**
 *
 * @param filterByBoth
 * @param onFilterChange
 * @param onKeywordChange
 * @param keywordVal
 * @param statePos
 * @param stateDepts
 * @param stateGrads
 * @param stateCenters
 * @param stateColleges
 * @param stateInterests
 * @param stateApproaches
 * @param statePets
 * @param stateCoffee
 * @param stateTattoos
 * @returns {*}
 * @constructor
 */
const Filters = (
  { filterByBoth, onFilterChange, onKeywordChange, keywordVal,
    statePos, stateDepts, stateGrads, stateCenters, stateColleges, stateInterests,
    stateApproaches, statePets, stateCoffee, stateTattoos }) => {

  // eslint-disable-next-line no-unused-vars
  const [keywordText, setKeywordText] = useState(keywordVal ? keywordVal : '');
  const [positionOptions, setPositionOptions] = useState(statePos ? statePos : []);
  const [departmentOptions, setDepartmentOptions] = useState(stateDepts ? stateDepts : []);
  const [gradFieldOptions, setGradFieldOptions] = useState(stateGrads ? stateGrads : []);
  const [interestOptions, setInterestOptions] = useState(stateInterests ? stateInterests : []);
  const [approachOptions, setApproachOptions] = useState(stateApproaches ? stateApproaches : []);
  const [centerOptions, setCenterOptions] = useState(stateCenters ? stateCenters : []);
  const [collegeOptions, setCollegeOptions] = useState(stateColleges ? stateColleges : []);
  const [petOptions, setPetOptions] = useState(statePets ? statePets : []);
  const [coffeeOptions, setCoffeeOptions] = useState(stateCoffee ? stateCoffee : []);
  const [tattooOptions, setTattooOptions] = useState(stateTattoos ? stateTattoos : []);

  // const [windowWidth, setWindowWidth] = useState(getWidth());

  const animatedSelect = makeAnimated();

  /**
   * For search by keyword on name fields
   * @param event
   */
  const handleKeywordChange = event => {
    event.preventDefault();

    setKeywordText(event.target.value);
    onKeywordChange(event.target.value);
  };

  const handleFilterChange = type => selectValues => {
    if (type === 'position') {
      setPositionOptions(selectValues);
      onFilterChange(type, selectValues);
    }
    if (type === 'graduate_fields') {
      setGradFieldOptions(selectValues);
      onFilterChange(type, selectValues);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handlePositionChange = values => {
    setPositionOptions(values);
    let stateChange = onFilterChange('position', values);
    console.log(stateChange, 'stateChange');
  };

  const handleDeptChange = values => {
    setDepartmentOptions(values);
    onFilterChange('departments', values);
  };

  const handleCentersChange = values => {
    setCenterOptions(values);
    onFilterChange('center_affiliations', values);
  };

  const handleInterestChange = values => {
    setInterestOptions(values);
    onFilterChange('interests', values);
  };

  const handleApproachChange = values => {
    setApproachOptions(values);
    onFilterChange('approaches', values);
  };

  const handleCollegesChange = values => {
    setCollegeOptions(values);
    onFilterChange('colleges', values);
  };

  const handlePetChange = values => {
    setPetOptions(values);
    onFilterChange('pets', values);
  };

  const handleCoffeeChange = values => {
    setCoffeeOptions(values);
    onFilterChange('coffee_or_tea', values);
  };

  const handleTattooChange = values => {
    setTattooOptions(values);
    onFilterChange('tattoos', values);
  };

  const selectStyles = {
    placeholder: base => ({
      ...base,
      fontSize: useCurrentWidth() < 1100 ? '14px' : '18px',
      color: '#202020',
      fontWeight: 500,
      padding: useCurrentWidth() < 1100 ? '2' : '10'
    }),
    option: base => ({
      ...base,
      padding: useCurrentWidth() < 1100 ? '15px' : '5px'
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#b31b1b'
    })
  };

  return (
    <div className="aside-wrapper aside-wrapper">
      <aside>

        <form onSubmit={filterByBoth}>

          <label className="sr-only" htmlFor="aside-search-filter">Search Filter</label>
          <input id="aside-search-filter"
                 onChange={handleKeywordChange}
                 value={keywordVal ? keywordVal : ''}
                 className="search-filter"
                 name="search"
                 type="search"
                 placeholder="Search by ..." />
          <nav className="aside-filters">

            <div className="panel panel__filters_header">
              <div className="panel__teaser">
                <h2>Filter By</h2>
              </div>
            </div>


            <div className="aside-row">
              <label className="sr-only" htmlFor="affiliates-position">Sort by Affiliate Position</label>
              <Select onChange={handleFilterChange('position')}
                      placeholder="Position"
                      styles={selectStyles}
                      isMulti
                      closeMenuOnSelect={true}
                      components={animatedSelect}
                      options={positionData()}
                      value={positionOptions}
                      inputId="affiliates-position"
                    />
            </div>

            <div className="aside-row">
              <label className="sr-only" htmlFor="affiliates-department">Sort by Affiliate Department</label>
              <Select onChange={handleDeptChange}
                      placeholder="Departments"
                      styles={selectStyles}
                      isMulti
                      closeMenuOnSelect={true}
                      components={animatedSelect}
                      options={departmentsData()}
                      value={departmentOptions}
                      inputId="affiliates-department"
                      />
            </div>

            <div className="aside-row">
            <label className="sr-only" htmlFor="affiliates-graduate-fields">Sort by Affiliate Graduate Fields</label>
              <Select
                onChange={handleFilterChange('graduate_fields')}
                placeholder="Graduate Fields"
                styles={selectStyles}
                isMulti
                closeMenuOnSelect={true}
                components={animatedSelect}
                options={graduateFieldsData()}
                value={gradFieldOptions}
                inputId="affiliates-graduate-fields"
                />
            </div>

            <div className="aside-row">
              <label className="sr-only" htmlFor="affiliates-colleges-and-schools">Sort by Affiliate Colleges and Schools</label>
              <Select onChange={handleCollegesChange}
                      placeholder="Colleges & Schools"
                      styles={selectStyles}
                      isMulti
                      closeMenuOnSelect={true}
                      components={animatedSelect}
                      options={collegesData()}
                      value={collegeOptions}
                      inputId="affiliates-colleges-and-schools"
                      />
            </div>

            <div className="aside-row">
              <label className="sr-only" htmlFor="affiliates-center-affiliations">Sort by Affiliate Center Affiliations</label>
              <Select onChange={handleCentersChange}
                      placeholder="Center Affiliations"
                      styles={selectStyles}
                      isMulti
                      closeMenuOnSelect={true}
                      components={animatedSelect}
                      options={centersData()} value={centerOptions}
                      inputId="affiliates-center-affiliations"
                      />
            </div>

            <div className="aside-row">
              <label className="sr-only" htmlFor="affiliates-research-interests">Sort by Affiliate Research Interests</label>
              <Select onChange={handleInterestChange}
                      placeholder="Research Interests"
                      styles={selectStyles}
                      isMulti
                      closeMenuOnSelect={true}
                      components={animatedSelect}
                      options={interestOptionsData()}
                      value={interestOptions}
                      inputId="affiliates-research-interests"
                      />
            </div>

            <div className="aside-row">
              <label className="sr-only" htmlFor="affiliates-research-approaches">Sort by Affiliate Research Approaches</label>
              <Select onChange={handleApproachChange}
                      placeholder="Research Approaches"
                      styles={selectStyles}
                      isMulti
                      closeMenuOnSelect={true}
                      components={animatedSelect}
                      options={researchApproachesData()}
                      value={approachOptions}
                      inputId="affiliates-research-approaches"/>
            </div>

            <div className="aside-row">
              <label className="sr-only" htmlFor="affiliates-tattoos">For fun - Sort by Affiliate Tattoos</label>
              <Select onChange={handleTattooChange}
                      placeholder="For fun - Tattoos?"
                      isClearable
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      components={animatedSelect}
                      options={tattooData()}
                      value={tattooOptions}
                      inputId="affiliates-tattoos"/>
            </div>

            <div className="aside-row">
              <label className="sr-only" htmlFor="affiliates-pets">For fun - Sort by Affiliate Pets</label>
              <Select onChange={handlePetChange}
                      placeholder="For fun - Pets?"
                      menuPlacement="top"
                      isClearable
                      isSearchable
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      components={animatedSelect}
                      options={petsData()}
                      value={petOptions}
                      inputId="affiliates-pets"/>
            </div>

            <div className="aside-row">
              <label className="sr-only" htmlFor="affiliates-coffee-or-tea">For fun - Sort by Affiliate preference of coffee or tea</label>
              <Select onChange={handleCoffeeChange}
                      placeholder="For fun - Coffee or tea?"
                      menuPlacement="top"
                      isClearable
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      components={animatedSelect}
                      options={coffeeData()}
                      value={coffeeOptions}
                      inputId="affiliates-coffee-or-tea"/>
            </div>

          </nav>
        </form>
      </aside>
    </div>
  );
};

Filters.propTypes = {
  filterByBoth: PropTypes.func.isRequired,
  keywordVal: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
  onKeywordChange: PropTypes.func.isRequired,
  stateApproaches: PropTypes.any,
  stateCenters: PropTypes.any,
  stateCoffee: PropTypes.any,
  stateColleges: PropTypes.any,
  stateDepts: PropTypes.any,
  stateGrads: PropTypes.any,
  stateInterests: PropTypes.any,
  statePets: PropTypes.any,
  statePos: PropTypes.any,
  stateTattoos: PropTypes.any
};

export default Filters;

