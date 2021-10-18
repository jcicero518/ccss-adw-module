import 'whatwg-fetch';
import { throttle, debounce } from 'throttle-debounce';
import React, { Component, createRef } from 'react';
import { Breakpoint } from 'react-socks';
import LoadingIndicator from './LoadingIndicator';

import initialState from '../initialState';
import Pager from './Pagination';
import Profile from './Profile';
import Filters from '../theme/Filters';
// const Filters = import(/* webpackChunkName: "filters" */ '../theme/Filters.js');

// eslint-disable-next-line no-unused-vars
import { Drawer, ButtonToolbar, IconButton, Button, Icon } from 'rsuite';
import '../../drawer.css';

import { checkFilterValues, checkKeywordFilter } from '../util/filterChecks';

import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';

import {FullGrid, ContentGrid} from '../util/placeholder';

const apiFilterSearch = '/api/view/json/users/search';
const ResultsPerPage = 18;

let lastScrollY = 0;

/**
 * ProfileContainer class
 */
export default class ProfileContainer extends Component {

  constructor(props) {
    super(props);

    this.topPageRef = createRef();
    this.navSidebar = createRef();

    this.state = initialState;

    this.filterByBoth = this.filterByBoth.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.filterReset = this.filterReset.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onKeywordChange = this.onKeywordChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);

    /**
     * Function wrapper for throttle call, requires callback function
     *
     * @param callback
     * @param delay
     * @returns {wrapper}
     */
    this.throttleCallback = (callback, delay = 5000) => {
      return throttle(delay, true, callback);
    };

    /**
     * Function wrapper for debounce call, invokes filterByBoth method
     *
     * @type {wrapper}
     */
    this.filterDebounced = debounce(500, false, this.filterByBoth);
  }

  static getScrollOffsetTop() {
    if (!document.getElementById('affiliates_section_main')) {
      return 0;
    }
    const containerElement = document.getElementById('affiliates_section_main');
    return (containerElement.offsetTop - 250);
  }

  /**
   * No localStorage for now until we get into production
   */
  componentDidMount() {
    const useLocalStorage = false;

    window.addEventListener('scroll', this.handleScroll, true);
    window.addEventListener('resize', this.handleWindowResize);

    if (useLocalStorage) {
      if (localStorage.getItem('affiliate-user-data')) {
        this.setState({
          data: JSON.parse(localStorage.getItem('affiliate-user-data')),
          initiallyLoaded: true,
          loaded: true
        });
      } else {
        fetch(`${apiFilterSearch}/all`)
          .then(response => response.json())
          .then(data => {
            if (!localStorage.getItem('affiliate-user-data')) {
              localStorage.setItem('affiliate-user-data', JSON.stringify(data.results));
            }
            this.setState({
              data: data.results,
              pagination: {
                current_page: 0,
                next_page: 1,
                items_per_page: data.pager.items_per_page,
                total_count: data.count,
                total_pages: data.pager.pages,
              },
              initiallyLoaded: true,
              loaded: true
            }, () => console.log(this.state, 'state on load'));
          });
      }
    } else {
      fetch(`${apiFilterSearch}/all`)
        .then(response => response.json())
        .then(data => {
          this.setState({
            data: data.results,
            pagination: {
              current_page: 0,
              next_page: 1,
              items_per_page: data.pager.items_per_page,
              total_count: data.count,
              total_pages: data.pager.pages,
              // total_pages: Math.ceil(parseInt(data.count) / ResultsPerPage)
            },
            initiallyLoaded: true,
            loaded: true
          }, () => console.log(this.state, 'state on load'));
        });
    }
  }

  handleWindowResize() {
    (this.throttleCallback(() => {
      this.setState({windowWidth: window.innerWidth}, () => {
        const { is_open } = this.state.drawer;
        const { windowWidth } = this.state;
        if (windowWidth > 1100 && is_open) {
          this.closeDrawer();
        }
      });
    })());
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleWindowResize);
  }

  /**
   * Called every time a react-select instance changes, update the
   * state with type
   *
   * @param type
   * @param values
   */
  onFilterChange(type, values) {
    this.setState({
      [type]: values
    }, () => {
      // Trigger form submit
      this.filterByBoth();
    });
  }

  /**
   * For keyword string filter, add to state
   *
   * Is now debounced, keyword is added to state then the
   * callback triggers the render
   *
   * @param keyword
   */
  onKeywordChange(keyword) {
    this.setState({keywordStr: keyword}, () => {
      this.filterDebounced();
    });
  }

  /**
   * Process filter values already added to the state and send new
   * request out.
   *
   * @param event
   */
  filterByBoth(event = null) {
    if (event) {
      event.preventDefault();
    }

    let scrollAmount = ProfileContainer.getScrollOffsetTop();
    window.scrollTo(0, scrollAmount);

    const {
      keywordStr, position, departments, graduate_fields, center_affiliations,
      interests, approaches, colleges, pets, coffee_or_tea, tattoos
    } = this.state;

    const { is_open } = this.state.drawer;

    let keywString = checkKeywordFilter(keywordStr);
    let posString = checkFilterValues(position, '+');
    let deptsString = checkFilterValues(departments, '+');
    let gradsString = checkFilterValues(graduate_fields, '+');
    let centersString = checkFilterValues(center_affiliations, '+');
    let intsString = checkFilterValues(interests, '+');
    let apprString = checkFilterValues(approaches, '+');
    let collsString = checkFilterValues(colleges);
    let petsString = checkFilterValues(pets);
    let coffeesString = checkFilterValues(coffee_or_tea);
    let tattoosString = checkFilterValues(tattoos);

    let fetchString = `${apiFilterSearch}/${posString}/${intsString}/${apprString}/${deptsString}/${centersString}/${collsString}/`;
    fetchString += `${petsString}/${coffeesString}/${tattoosString}/${gradsString}/${keywString}`;
    fetchString += '?page=0';

    const { items_per_page } = this.state.pagination;

    fetchString += `&items_per_page=${items_per_page}`;

    this.setState({
      loaded: false
    }, () => {
      fetch(fetchString)
        .then(response => response.json())
        .then(filteredData => {
          this.setState({
            data: filteredData.results,
            pagination: Object.assign(this.state.pagination, {
              total_count: filteredData.count,
              current_page: filteredData.pager.current_page
            }),
            loaded: true
          }, () => {
            if (is_open) {
              this.closeDrawer();
            }
          });
        });
    });
  }

  /**
   * Called by pagination - retain current filter state in request
   * and append a page query parameter
   *
   * @param page
   * @param pageSize
   */
  onPageChange(page, pageSize = null) {
    let apiPageNum = (page - 1);

    let scrollAmount = ProfileContainer.getScrollOffsetTop();
    window.scrollTo(0, scrollAmount);

    const {
      keywordStr, position, departments, graduate_fields, center_affiliations,
      interests, approaches, colleges, pets, coffee_or_tea, tattoos
    } = this.state;

    let keywString = checkFilterValues(keywordStr);
    let posString = checkFilterValues(position, '+');
    let deptsString = checkFilterValues(departments, '+');
    let gradsString = checkFilterValues(graduate_fields, '+');
    let centersString = checkFilterValues(center_affiliations, '+');
    let intsString = checkFilterValues(interests, '+');
    let apprString = checkFilterValues(approaches, '+');
    let collsString = checkFilterValues(colleges);
    let petsString = checkFilterValues(pets);
    let coffeesString = checkFilterValues(coffee_or_tea);
    let tattoosString = checkFilterValues(tattoos);

    let fetchString = `${apiFilterSearch}/${posString}/${intsString}/${apprString}/${deptsString}/${centersString}/${collsString}/`;
    fetchString += `${petsString}/${coffeesString}/${tattoosString}/${gradsString}/${keywString}`;
    fetchString += `?page=${apiPageNum}`;

    const { items_per_page, total_count, total_pages } = this.state.pagination;

    if (pageSize) {
      fetchString += `&items_per_page=${pageSize}`;
    } else {
      fetchString += `&items_per_page=${items_per_page}`;
      pageSize = items_per_page;
    }

    this.setState({
      loaded: false,
    }, () => {
      fetch(fetchString)
        .then(response => response.json())
        .then(filteredData => {
          this.setState({
            data: filteredData.results,
            pagination: {
              current_page: apiPageNum,
              next_page: (apiPageNum + 1),
              items_per_page: pageSize,
              total_count: total_count,
              total_pages: total_pages,
              // total_pages: Math.ceil(parseInt(this.state.pagination.total_count) / ResultsPerPage)
            },
            loaded: true
          });
        });
    });
  }

  filterReset() {
    let scrollAmount = ProfileContainer.getScrollOffsetTop();
    window.scrollTo(0, scrollAmount);

    const cb = () => {
      fetch(`${apiFilterSearch}/all?page=0`)
        .then(response => response.json())
        .then(data => {
          this.setState({
            data: data.results,
            pagination: {
              current_page: 0,
              next_page: 1,
              items_per_page: data.pager.items_per_page,
              total_count: data.count,
              total_pages: Math.ceil(parseInt(data.count) / ResultsPerPage)
            },
            position: [],
            departments: [],
            graduate_fields: [],
            center_affiliations: [],
            colleges: [],
            interests: [],
            approaches: [],
            pets: [],
            coffee_or_tea: [],
            tattoos: [],
            keywordStr: '',
            loaded: true
          });
        });
    };

    this.setState({loaded: false}, cb);
  }

  /**
   * Window scroll listener
   */
  handleScroll() {
    lastScrollY = window.scrollY;

    if (this.navSidebar) {
      try {
        let navBounds = this.navSidebar.parentElement.getBoundingClientRect();
        let navOffsetTop = this.navSidebar.parentElement.offsetTop;
        let ctaBannerElement = document.querySelector('.banner_cta_panel');
        let ctaBannerHeight = ctaBannerElement.clientHeight;
        let footerInner = document.querySelector('.footer__inner');

        if ((navOffsetTop + navBounds.y) < lastScrollY) {
          if (!this.navSidebar.classList.contains('is-fixed')) {
            this.navSidebar.classList.add('is-fixed');
          }
        } else {
          if (this.navSidebar.classList.contains('is-fixed')) {
            this.navSidebar.classList.remove('is-fixed');
          }
        }

        if (footerInner.getBoundingClientRect().y && footerInner.getBoundingClientRect().y < (footerInner.clientHeight + ctaBannerHeight)) {
          this.navSidebar.classList.remove('is-fixed');
        }
      } catch (e) {
        console.warn(e);
      }

    }
  }

  toggleDrawer() {
    this.setState({
      drawer: Object.assign(this.state.drawer, {is_open: true})
    });
  }

  closeDrawer() {
    this.setState({
      drawer: Object.assign(this.state.drawer, {is_open: false})
    });
  }

  render() {
    const { data, loaded, initiallyLoaded, windowWidth } = this.state;
    const { is_open, placement } = this.state.drawer;
    const { total_count, current_page, items_per_page } = this.state.pagination;

    if (!initiallyLoaded && data.length === 0) {
      if (windowWidth < 800) {
        return <LoadingIndicator/>;
      }

      return (
        <div className="global_width">
          <FullGrid/>
        </div>
      );
    }

    return (
      <>
        <div className="page_copy" ref={this.topPageRef}>
          <Breakpoint l down>
            {!is_open
              ?
              <div className="mobile-affil-toolbar">
                <a onClick={this.toggleDrawer} title="Toggle Filters">
                  <p>Toggle Filters</p>
                  <span className="fa fa-fw fa-plus-circle menu-toggle" aria-hidden="true"> </span>
                </a>
              </div>
              : null
            }
          </Breakpoint>

          <div className="global_width">

            <Breakpoint l down>
              <Drawer
                placement={placement}
                show={is_open}
                onHide={this.closeDrawer}
                size="xs">

                <Drawer.Header>

                </Drawer.Header>

                <Drawer.Body>
                  <div className="page_copy__sidebar page_copy__sidebar-filters">
                    <div className="sticky-aside">
                      <Filters
                        onFilterChange={this.onFilterChange}
                        onKeywordChange={this.onKeywordChange}
                        keywordVal={this.state.keywordStr}
                        filterByBoth={this.filterByBoth}
                        statePos={this.state.position}
                        stateDepts={this.state.departments}
                        stateGrads={this.state.graduate_fields}
                        stateCenters={this.state.center_affiliations}
                        stateColleges={this.state.colleges}
                        stateInterests={this.state.interests}
                        stateApproaches={this.state.approaches}
                        statePets={this.state.pets}
                        stateCoffee={this.state.coffee_or_tea}
                        stateTattoos={this.state.tattoos} />
                    </div>
                  </div>
                </Drawer.Body>
                <Drawer.Footer>

                </Drawer.Footer>
              </Drawer>
            </Breakpoint>


            <div className="page_copy__inner">
              <div className="page_copy__content">
                <div className="content" style={{'minHeight': '50vh'}}>
                  <ReactPlaceholder ready={loaded} customPlaceholder={<ContentGrid/>}>
                    <section className="affiliate_main">
                      {data.map((data, index) =>
                        <Profile key={index} viewData={data} />
                      )}
                    </section>
                  </ReactPlaceholder>

                  {loaded && data.length === 0 ? <p>No affiliates matching the selected criteria are available.</p> : ''}

                </div>

                <Pager container_ref={this.topPageRef}
                  page_change_func={this.onPageChange}
                  current_page={current_page ? (current_page + 1) : 1}
                  total={total_count ? total_count : 18}
                  pagesize={items_per_page ? items_per_page : 18} />

              </div>

              <Breakpoint id="sidebar-filters--aside" className="page_copy__sidebar page_copy__sidebar-filters" style={{width: '350px'}} l up>

                <div ref={(ref) => this.navSidebar = ref} className="sticky-aside">
                  <Filters
                    onFilterChange={this.onFilterChange}
                    onKeywordChange={this.onKeywordChange}
                    keywordVal={this.state.keywordStr}
                    filterByBoth={this.filterByBoth}
                    statePos={this.state.position}
                    stateDepts={this.state.departments}
                    stateGrads={this.state.graduate_fields}
                    stateCenters={this.state.center_affiliations}
                    stateColleges={this.state.colleges}
                    stateInterests={this.state.interests}
                    stateApproaches={this.state.approaches}
                    statePets={this.state.pets}
                    stateCoffee={this.state.coffee_or_tea}
                    stateTattoos={this.state.tattoos}
                  />
                </div>

              </Breakpoint>

            </div>

          </div>
        </div>
      </>
    );
  }

}
