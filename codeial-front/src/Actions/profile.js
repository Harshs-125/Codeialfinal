import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAIL,
  USER_PROFILE_SUCCESSFUL,
} from './actionTypes';

export function startUserProfileFetch(user) {
  return {
    type: FETCH_USER_PROFILE,
    user,
  };
}

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESSFUL,
    user,
  };
}
export function userProfileFail(error) {
  return {
    type: USER_PROFILE_FAIL,
    error,
  };
}
export function fetchUserProfile(userId)
{
    return (dispatch)=>{
        dispatch(startUserProfileFetch);
        const url=`/api/v1/users/${userId}`;
        fetch(url,{
            method: 'get',
            headers: {
              Mode: 'no-cors',
              Accept: 'application/json',
              Authorization:localStorage.getItem('token')
            }
        })
        .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          //dispatch an action to save user
          return dispatch(userProfileSuccess(data.data.user));
        } else return dispatch(userProfileFail(data.message));
      });
    }
}
