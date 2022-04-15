import { FETCH_SEARCH_SUCCESS_RESULT } from '../Actions/actionTypes';
import { searchResultSuccess } from '../Actions/search';

const initialSearchState = {
  results: [],
};

export default function search(state = initialSearchState, action) {
  switch (action.type) {
    case FETCH_SEARCH_SUCCESS_RESULT: {
      return {
        ...state,
        results: action.users,
      };
    }
    default:
      return state;
  }
}
