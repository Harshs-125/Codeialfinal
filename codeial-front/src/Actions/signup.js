import { SIGNUP_START, SIGNUP_FAILED, SIGNUP_SUCCESS, AUTHENTICATE_USER,LOG_OUT } from './actionTypes';
import { getFormBody } from '../helper/utils';

export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}
export function signupFailed(error) {
  return {
    type: SIGNUP_FAILED,
    error
  };
}
export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user
  };
}
export function authenticateUser(user){
  return {
      type:AUTHENTICATE_USER,
      user
  };
}
export function signup(name, email, password) {
  return (dispatch) => {
    dispatch(startSignup);
    const url = '/api/v1/users/signup';
    fetch(url, {
      method: 'post',
      headers: {
        Mode: 'no-cors',
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ name, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
            localStorage.setItem('token',data.data.token);  
          dispatch(signupSuccess(data.data.user));
          return;
        } else dispatch(signupFailed(data.message));
      });
  };
}
