import PropTypes from 'prop-types';
import React, {useState} from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/pro-regular-svg-icons';

import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

import { pageSizeOptionsData } from '../../util/filterData';

const jumpToId = 'affiliates_section_main';

const animatedSelect = makeAnimated();

const prevIcon = () => {
  return <FontAwesomeIcon icon={faChevronLeft} style={{'color': '#b31b1b'}} />;
};

const nextIcon = () => {
  return <FontAwesomeIcon icon={faChevronRight} style={{'color': '#b31b1b'}} />;
};

const itemRender = (current, type, element) => {
  if (type === 'page') {
    return <a onClick={(event) => event.preventDefault()} href={`#${jumpToId}`}>{current}</a>;
  }
  return element;
};

const pageSizeOptions = [
  '18', '36', '63', '108'
];

const selectStyles = {
  // eslint-disable-next-line no-unused-vars
  container: (base, state) => ({
    ...base,
    width: '120px'
  }),
  placeholder: base => ({
    ...base,
    fontSize: '16px',
    color: '#202020',
    fontWeight: 500,
    padding: '10px'
  }),
  option: base => ({
    ...base,
    padding: '5px'
  }),
  // eslint-disable-next-line no-unused-vars
  dropdownIndicator: (base, state) => ({
    ...base,
    color: '#b31b1b'
  })
};


// eslint-disable-next-line no-unused-vars
const Pager = ({ container_ref, page_change_func, current_page, total, pagesize }) => {

  const [itemsPerPage, setItemsPerPage] = useState([{ value: pageSizeOptions[0], label: pageSizeOptions[0]}]);

  // eslint-disable-next-line no-unused-vars
  const onShowSizeChange = (event) => {
    event.preventDefault();
    page_change_func(current_page, event.target.value);
  };

  const onItemsPerPageChange = values => {
    console.log(values, 'items per change');
    // container_ref.current.scrollIntoView({behavior: 'auto', block: 'start', inline: 'start'});
    const { value } = values;
    setItemsPerPage(values);
    page_change_func(1, value);
  };

  const triggerScroll = (page) => {
    // container_ref.current.scrollIntoView({behavior: 'auto', block: 'start', inline: 'start'});
    page_change_func(page);
  };

  return (
    <>
      <div className="pagination--per-page">
        <label htmlFor="affiliates-pagination">Per page:</label>
        <Select
          onChange={onItemsPerPageChange}
          options={pageSizeOptionsData()}
          closeMenuOnSelect={true}
          components={animatedSelect}
          value={itemsPerPage}
          styles={selectStyles}
          inputId="affiliates-pagination"
        />

      </div>

      <Pagination
        pageSizeOptions={pageSizeOptions}
        onChange={triggerScroll}
        locale="en_US"
        total={total} current={current_page}
        itemRender={itemRender}
        pageSize={pagesize}
        prevIcon={prevIcon}
        nextIcon={nextIcon} />
    </>
  );
};

Pager.propTypes = {
  container_ref: PropTypes.any,
  current_page: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  page_change_func: PropTypes.func,
  pagesize: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  total: PropTypes.string
};

export default Pager;
