import { combineReducers } from 'redux';
import posts from './post';
import auth from './auth';
import signup from './signup';
import profile from './profile';
import friends from './friends';
import search from './search';
export default combineReducers({
  posts,
  auth,
  signup,
  profile,
  friends,
  search,
});
