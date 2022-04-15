import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import dp from './assets/user.png';
import { Post } from './';
import CreatePost from './CreatePost';
class PostList extends Component {
  render() {
    const { posts ,auth} = this.props;
    return (
      <div className="posts-list">
      {auth.isLoggedIn&&<CreatePost />}
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth:state.auth
  };
}
export default connect(mapStateToProps)(PostList);
