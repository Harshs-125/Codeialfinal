import {
  ADD_POST,
  UPDATE_POSTS,
  ADD_COMMENT,
  UPDATE_POST_LIKE,
  UPDATE_POST_UNLIKE,
} from './actionTypes';
import { APIurls } from '../helper/urls';
import { getFormBody } from '../helper/utils';

export function fetchPosts() {
  return (dispatch) => {
    const url = "/api/v1/posts";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(updatePosts(data.post));
      });
  };
}
export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}
export function createPost(content) {
  return (dispatch) => {
    const url = '/api/v1/posts/add';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: localStorage.getItem('token'),
      },
      body: getFormBody({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addPost(data.data.post));
        }
      });
  };
}
export function createComment(content, postId) {
  return (dispatch) => {
    const url = '/api/v1/posts/addcomment';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: localStorage.getItem('token'),
      },
      body: getFormBody({ content, postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addComment(data.data.comment, postId));
        }
      });
  };
}

export function addComment(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment,
    postId,
  };
}
export function addLike(id, likeType, userId) {
  return (dispatch) => {
    const url = `/api/v1/posts/likes/toggle?likeable_id=${id}&likeable_type=${likeType}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-urlencode',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (data.data.deleted) {
            dispatch(unlikeFromStore(id, userId, data.data.like));
          } else {
            dispatch(addLikeToStore(id, userId, data.data.like));
          }
        }
      });
  };
}
export function addLikeToStore(postId, userId, like) {
  return {
    type: UPDATE_POST_LIKE,
    postId,
    userId,
    like,
  };
}
export function unlikeFromStore(postId, userId, like) {
  return {
    type: UPDATE_POST_UNLIKE,
    postId,
    userId,
    like,
  };
}
