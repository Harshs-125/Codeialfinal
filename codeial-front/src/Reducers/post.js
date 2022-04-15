import {
  UPDATE_POSTS,
  ADD_POST,
  ADD_COMMENT,
  UPDATE_POST_LIKE,
  UPDATE_POST_UNLIKE,
} from '../Actions/actionTypes';

export default function post(state = [], action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    case ADD_POST: {
      return [action.post, ...state];
    }
    case ADD_COMMENT: {
      const newPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }
        return post;
      });
      return newPosts;
    }
    case UPDATE_POST_LIKE: {
      const newPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            likes: [...post.likes, { user: action.userId }],
          };
        }
        return post;
      });
      return newPosts;
    }
    case UPDATE_POST_UNLIKE: {
      const newPosts = state.map((post) => {
        if (post._id === action.postId) {
          let newLikes = post.likes.filter((like) => {
            if (like.user !== action.userId) {
              return like;
            }
          });
          return {
            ...post,
            likes: newLikes,
          };
        }

        return post;
      });
      return newPosts;
    }
    default:
      return state;
  }
}
