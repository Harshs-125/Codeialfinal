import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../Actions/auth';
import dp from './assets/user.png';
import search from './assets/search.png';
import { searchUsers } from '../Actions/search';
function Navbar(props) {
  function handleLogout() {
    localStorage.removeItem('token');
    props.dispatch(logoutUser());
  }
  function handleChange(e) {
    const searchText = e.target.value;
    props.dispatch(searchUsers(searchText));
  }
  const { auth, results, signup } = props;
  const users = results.results;
  return (
    <nav className="nav">
      <div className="left-nav">
        <Link to="/">
          <img
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
            alt="logo"
          />
        </Link>
      </div>
      {(props.auth.isLoggedIn || props.signup.isSignedIn) && (
        <>
          <div className="search-container">
            <img className="search-icon " src={search} alt="search-icn" />
            <input placeholder="Search" onChange={handleChange} />
            {users.length > 0 && (
              <div className="search-results">
                <ul>
                  {users.map((user) => {
                    if (user._id !== props.auth.user._id)
                      return (
                        <li className="search-results-row" key={user._id}>
                          <Link to={`/profile/${user._id}`}>
                            <img src={dp} alt="user-dp" />
                            <span>{user.name}</span>
                          </Link>
                        </li>
                      );
                    return null;
                  })}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
      <div className="right-nav">
        {props.auth.isLoggedIn && (
          <Link to="/settings">
            <div className="user">
              <img src={dp} alt="user-dp" id="user-dp" />
              <span>{props.auth.user.name}</span>
            </div>
          </Link>
        )}
        <div className="nav-links">
          <ul>
            {!props.auth.isLoggedIn && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {!props.auth.isLoggedIn && (
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            )}
            {props.auth.isLoggedIn && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    signup: state.signup,
    results: state.search,
  };
}
export default connect(mapStateToProps)(Navbar);
