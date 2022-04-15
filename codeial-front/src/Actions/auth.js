import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  AUTHENTICATE_USER,
  LOG_OUT,
  CLEAR_AUTH_STATE,
  EDIT_USER_SUCCESSFUL,
  EDIT_USER_FAILED,
} from './actionTypes';
import { APIurls } from '../helper/urls';
import { getFormBody } from '../helper/utils';
export function startLogin() {
  return {
    type: LOGIN_START,
  };
}
export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin);
    const url = '/api/v1/users/createsession';
    fetch(url, {
      method: 'post',
      headers: {
        Mode: 'no-cors',
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      //make sure to serialize your JSON body
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          //dispatch an action to save user

          localStorage.setItem('token', data.data.token);
          dispatch(loginSuccess(data.data.user));

          return;
        } else dispatch(loginFailed(data.message));
      });
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}
export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}
export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}
export function editUserSuccessful(user) {
  return {
    type: EDIT_USER_SUCCESSFUL,
    user,
  };
}
export function editUserFailed(error) {
  return {
    type: EDIT_USER_FAILED,
    error,
  };
}
export function editUser(name, password, confirmPassword, userId) {
  return (dispatch) => {
    const url = 'https://api-codeial.herokuapp.com/api/v1/users/edituser';
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: localStorage.getItem('token'),
      },
      body: getFormBody({
        name,
        password,
        confirm_password: confirmPassword,
        id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (data.data.token) {
            localStorage.setItem('token', data.data.token);
          }
          return dispatch(editUserSuccessful(data.data.user));
        } else {
          return dispatch(editUserFailed(data.message));
        }
      });
  };
}
