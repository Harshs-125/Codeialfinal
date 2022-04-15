import {
  FETCH_FRIEND_LIST,
  UPDATE_FRIEND_LIST,
  ADD_FRIEND,
  REMOVE_FRIEND,
} from '../Actions/actionTypes';
const defaultProfileState = [];
export default function friends(state = defaultProfileState, action) {
  switch (action.type) {
    case FETCH_FRIEND_LIST: {
      return [...action.friends];
    }
    case UPDATE_FRIEND_LIST: {
      return [...action.friends];
    }
    case ADD_FRIEND: {
      return state.concat(action.friend);
    }
    case REMOVE_FRIEND: {
      const newArr = state.filter((friend) => 
        // return (
        //   friend?.to?._id !== action.userId || friend?.id !== action.userId
        // );
      friend.id!==action.userId);
      return newArr;
    }
    default: {
      return state;
    }
  }
}
