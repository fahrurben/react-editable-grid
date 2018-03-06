import { getStarted, getFailed, getSucceeded } from './CommonHelper';

const SEARCH_DATA = 'Search Data';

const initialState = {
  data: null,
  error: null
};

const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
  case getStarted(SEARCH_DATA):
  case getFailed(SEARCH_DATA):
    return { error: action.error };
  case getSucceeded(SEARCH_DATA):
    return { data: action.payload };
  default:
    return state;
  }
};

export default SearchReducer;