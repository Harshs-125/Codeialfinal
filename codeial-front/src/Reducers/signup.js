import {
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  SIGNUP_START,
  CLEAR_AUTH_STATE,
  AUTHENTICATE_USER,
} from '../Actions/actionTypes';
const initialSignupState = {
  error: null,
  isSignedIn: false,
  inProgress: false,
  user: {},
};
export default function signup(state = initialSignupState, action) {
  switch (action.type) {
    case CLEAR_AUTH_STATE:{
      return {
        ...state,
        error:null
      }
    }
    case SIGNUP_START: {
      return {
        ...state,
        inProgress: true,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        user: action.user,
        error: null,
        isSignedIn:true
      };
    }
    case SIGNUP_FAILED: {
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    }
    case AUTHENTICATE_USER:{
      return {
        ...state,
        user:action.user
      }
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
