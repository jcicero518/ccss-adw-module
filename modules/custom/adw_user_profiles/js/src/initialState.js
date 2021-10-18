export default {
  data: [],
  drawer: {
    is_open: false,
    placement: 'left'
  },
  pagination: {
    current_page: 0,
    next_page: 1,
    items_per_page: 18,
    total_count: null,
    total_pages: null
  },
  position: [],
  departments: [],
  center_affiliations: [],
  colleges: [],
  graduate_fields: [],
  interests: [],
  approaches: [],
  pets: [],
  coffee_or_tea: [],
  tattoos: [],
  filteredData: [],
  effectData: [],
  keywordStr: '',
  initiallyLoaded: false,
  loaded: false,
  windowWidth: window.innerWidth
};
