import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAuthState, login } from '../Actions/auth';
class Login extends Component {
  constructor(props) {
    super(props);
    //this is uncontrolled way
    // this.emailinputref=React.createRef();
    // this.passwordinputref=React.createRef();
    //this is controlled way
    this.state = {
      email: '',
      password: '',
      ...props,
    };
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      this.props.dispatch(login(email, password));
    }
  };
  render() {
    const { error, inProgress } = this.props.auth;
    if (this.props.auth.isLoggedIn) {
      return <Navigate to="/" />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">LoginIn</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            onChange={this.handleEmailChange}
            placeholder="Email"
            required
          ></input>
        </div>
        <div className="field">
          <input
            type="password"
            onChange={this.handlePasswordChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Logging in...{' '}
            </button>
          ) : (
            <button onClick={this.handleFormSubmit}>Login </button>
          )}
        </div>
      </form>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Login);
