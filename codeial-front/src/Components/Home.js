import React, { Component } from 'react';
import { PostList, FriendList, Chat,CreatePost } from './';

import FriendListItem from './FriendListItem';
class Home extends Component {
  render(props) {
    const { posts, friends, isLoggedIn } = this.props;
    return (
      <div className="home">
        
        <PostList posts={posts} />
        {isLoggedIn && <FriendList friends={friends} />}
        {isLoggedIn && <Chat />}
      </div>
    );
  }
}
function mapStateToProps(state)
{
  return {
    auth:state.auth
  }
}
export default Home;
