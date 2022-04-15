import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import {
  BrowserRouter as Router,
  Routes,
  Link,
  Route,
  Navigate,
  useNavigate,
  Outlet,
} from 'react-router-dom';
import { fetchPosts } from '../Actions/post';
import {
  Home,
  Navbar,
  Page404,
  Login,
  Signup,
  Settings,
  Profile,
  CreatePost,
} from './index';
import { authenticateUser } from '../Actions/auth';
import { fetchFriendList } from '../Actions/friends';

function PrivateRoute({ isLoggedin, children }) {
  return isLoggedin ? children : <Navigate to="/login" />;
}
class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
      this.props.dispatch(fetchFriendList());
    }
  }

  render() {
    const { posts, auth, friends } = this.props;

    return (
      <Router>
        <>
          <div>
            <Navbar />
          </div>
          <Routes>
            {/* <PostList posts={posts} /> */}
            <Route
              exact={true}
              path="/"
              element={
                <Home
                  {...this.props}
                  posts={posts}
                  isLoggedIn={auth.isLoggedIn}
                  friends={friends}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/settings"
              element={
                <PrivateRoute isLoggedin={auth.isLoggedIn}>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/:userid"
              element={
                <PrivateRoute isLoggedin={auth.isLoggedIn}>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
    friends: state.friends,
  };
}

export default connect(mapStateToProps)(App);
