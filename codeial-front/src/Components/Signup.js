import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { signup, signupFailed } from '../Actions/signup';
import { connect } from 'react-redux';
import { clearAuthState } from '../Actions/auth';

function Signup(props) {
  useEffect(
    () => () => {
      props.dispatch(clearAuthState());
    },
    []
  );
  useEffect(() => {
    if (props.auth.isLoggedIn) {
      return <Navigate to="/" />;
    }
  });
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  function eventHandle(event) {
    const { name, value } = event.target;
    setUserDetails((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();

    const { name, email, password, confirm_password } = userDetails;
    if (name && email && password === confirm_password) {
      props.dispatch(signup(name, email, password));
      return;
    } else {
      props.dispatch(signupFailed('password and cofirm password dont match'));
      return;
    }
  }
  // const {error,inProgress} =props.signup;
  if (props.signup.isSignedIn) {
    return <Navigate to="/" />;
  }
  return (
    <form className="login-form">
      <span className="login-signup-header">Signup</span>
      {props.signup.error && (
        <div className="alert error-dialog">{props.signup.error}</div>
      )}
      <div className="field">
        <input
          type="text"
          onChange={eventHandle}
          name="name"
          value={userDetails.name}
          placeholder="Enter Name"
          require
        />
      </div>
      <div className="field">
        <input
          type="email"
          onChange={eventHandle}
          name="email"
          value={userDetails.email}
          placeholder="Enter Email"
          require
        />
      </div>
      <div className="field">
        <input
          type="password"
          onChange={eventHandle}
          name="password"
          value={userDetails.password}
          placeholder="Enter Password"
          require
        />
      </div>
      <div className="field">
        <input
          type="password"
          onChange={eventHandle}
          name="confirm_password"
          value={userDetails.confirm_password}
          placeholder="Enter Confirm Password"
          require
        />
      </div>
      <div className="field">
        {props.signup.inProgress ? (
          <button onClick={handleSubmit} disabled={props.signup.inProgress}>
            Signing in...{' '}
          </button>
        ) : (
          <button onClick={handleSubmit}>Sign in </button>
        )}
      </div>
    </form>
  );
}

function mapStateToProps(state) {
  return {
    signup: state.signup,
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Signup);
