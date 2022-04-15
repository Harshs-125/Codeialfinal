import React from 'react';
import { Link } from 'react-router-dom';
import { toDate } from '../helper/utils';
function Comment(props) {
  const { comment } = props;
  return (
    <div className="post-comment-item">
      <div className="post-comment-header">
        <span className="post-comment-author">{comment.user.name}</span>
        <span className="post-comment-time">
          {toDate(new Date(comment.createdAt))}
        </span>
      </div>
      <div className="post-comment-content">{comment.content}</div>
    </div>
  );
}

export default Comment;
