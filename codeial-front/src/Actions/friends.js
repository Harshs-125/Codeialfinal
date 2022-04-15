import { UPDATE_FRIEND_LIST, ADD_FRIEND, REMOVE_FRIEND } from './actionTypes';

export function fetchFriendList(userid) {
  return (dispatch) => {
    const url = `/api/v1/friends/getfriends`;
    fetch(url, {
      method: 'get',
      headers: {
        Mode: 'no-cors',
        Accept: 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(updateFriendList(data.data.friends));
      });
  };
}
export function updateFriendList(friends) {
  return {
    type: UPDATE_FRIEND_LIST,
    friends,
  };
}
export function addFriend(friend) {
  return {
    type: ADD_FRIEND,
    friend,
  };
}
export function removeFriend(userId) {
  console.log("c",userId);
  return {
    type: REMOVE_FRIEND,
    userId,
  };
}
