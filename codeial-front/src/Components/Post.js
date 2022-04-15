import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import dp from '../Components/assets/user.png';
import { addLike, createComment } from '../Actions/post';
import { Comment } from './';
import { connect } from 'react-redux';
import liked from './assets/liked.png';
import like from './assets/like.png';
import { toDate } from '../helper/utils';

function Post(props) {
  const { post, user } = props;
  const [comment, setComment] = useState('');
  const [isPostLikedByUser, setIsPostLikedByUser] = useState(false);
  console.log(post.likes);
  console.log(user._id);
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleAddComment = (e) => {
    if (e.key === 'Enter') {
      props.dispatch(createComment(comment, post._id));
      setComment('');
    }
  };
  const handlePostLike = () => {
    props.dispatch(addLike(post._id, 'Post', user._id));
  };
  useEffect(() => {
    setIsPostLikedByUser(
      post.likes.filter((like) => like.user === user._id).length > 0
    );
  }, [post]);
  return (
    <div className="post-wrapper" key={post._id} post={post}>
      <div className="post-header">
        <Link to={`/profile/${post.user._id}`} style={{textDecoration:"none"}}>
          <div className="post-avatar">
            <img src={dp} alt="profile-img" />
            <div>
              <span className="post-author">{post.user.name}</span>
              <span className="post-time">
                {toDate(new Date(post.createdAt))}
              </span>
            </div>
          </div>
        </Link>
        <div className="post-content">{post.content}</div>
        <div className="post-actions">
          <button className="post-like no-btn" onClick={handlePostLike}>
            {isPostLikedByUser ? (
              <img src={liked} alt="like-btn" />
            ) : (
              <img src={like} alt="like-btn" />
            )}
            <span>{post.likes.length}</span>
          </button>
          <div className="post-comments-icon">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2462/2462719.png"
              alt="comment-btn"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className="post-comment-box">
          <input
            placeholder="Write a Comment"
            onChange={handleChange}
            onKeyPress={handleAddComment}
            value={comment}
          ></input>
          <div className="post-comments-list">
            {post.comments.map((comment) => {
              return (
                <Comment
                  comment={comment}
                  key={comment._id}
                  postId={post._id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStateToProps)(Post);
