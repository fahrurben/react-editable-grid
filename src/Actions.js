import { createActionThunk } from 'redux-thunk-actions';
import data from './data.json';

const SEARCH_DATA = 'Search Data';

function searchDataService() {
  let promise1 = new Promise(function(resolve) {
    resolve(data);
  });
  return promise1;
}

let searchData = createActionThunk(SEARCH_DATA, () => searchDataService());

export default { searchData }