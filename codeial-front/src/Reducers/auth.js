import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  AUTHENTICATE_USER,
  LOG_OUT,
  CLEAR_AUTH_STATE,
  EDIT_USER_FAILED,
  EDIT_USER_SUCCESSFUL,
} from '../Actions/actionTypes';
const initialAuthState = {
  user: {},
  error: null,
  isLoggedIn: localStorage.getItem('token') != null,
  inProgress: false,
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case CLEAR_AUTH_STATE: {
      return {
        ...state,
        error: null,
      };
    }
    case LOGIN_START: {
      return {
        ...state,
        inProgress: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
        inProgress: false,
        error: null,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    }
    case AUTHENTICATE_USER: {
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      };
    }
    case EDIT_USER_FAILED: {
      return {
        ...state,
        error: action.error,
      };
    }
    case EDIT_USER_SUCCESSFUL: {
      return {
        ...state,
        user: action.user,
        error: false,
      };
    }
    default: {
      return state;
    }
  }
}
