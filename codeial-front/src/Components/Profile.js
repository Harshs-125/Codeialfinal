import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import dp from './assets/user.png';
import { fetchUserProfile } from '../Actions/profile';
import { addFriend, removeFriend } from '../Actions/friends';

function Profile(props) {
  const params = useParams();
  const [friendState, setFriendState] = useState({
    success: null,
    error: null,
    successMessage: null,
  });
  useEffect(() => {
    props.dispatch(fetchUserProfile(params.userid));
  }, [params.userid]);
  const userid = params.userid;
  const [isUserAFriend, setIsUserAFriend] = useState(false);
  useEffect(() => {
    let index = props.friends
      .map((friend) => friend?.to?._id || friend?.id)
      .indexOf(userid);
    if (index !== -1) {
      setIsUserAFriend(true);
    } else {
      setIsUserAFriend(false);
    }
  }, [props.friends]);
  async function handleAddFriendClick(e) {
    
    const url = `https://api-codeial.herokuapp.com/api/v1/friends/add/${params.userid}`;
    const options = {
      method: 'post',
      headers: {
        Mode: 'no-cors',
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: localStorage.getItem('token'),
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success) {
      setFriendState({
        success: true,
        successMessage: 'Added friend successfully',
      });
      props.dispatch(addFriend(data.data.to));
      return;
    } else {
      setFriendState({
        success: null,
        error: data.message,
      });
      return;
    }
  }
  async function handleRemoveFriendClick(e) {
    const url = `https://api-codeial.herokuapp.com/api/v1/friends/remove/${params.userid}`;
    const aoptions = {
      method: 'post',
      headers: {
        Mode: 'no-cors',
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: localStorage.getItem('token'),
      },
    };
    const response = await fetch(url, aoptions);
    const data = await response.json();
    if (data.success) {
      setFriendState({
        success: true,
        successMessage: 'Removed friends Successfully',
      });
      props.dispatch(removeFriend(params.userid));
      return;
    } else {
      setFriendState({
        success: null,
        error: data.message,
      });
      return;
    }
  }
  if (userid === props.auth.user._id) {
    return <Navigate to="/settings" />;
  }
  return (
    <div className="settings">
      <div className="img-container">
        <img src={dp} alt="user-dp" id="user-dp" />
      </div>
      <div className="field">
        <div className="field-label">Name</div>
        <div className="field-value">{props.profile.user.name}</div>
      </div>
      <div className="field">
        <div className="field-label">Email</div>
        <div className="field=value">{props.profile.user.email}</div>
      </div>
      <div className="btn-grp">
        {!isUserAFriend ? (
          <button className="button save-btn" onClick={handleAddFriendClick}>
            Add Friend
          </button>
        ) : (
          <button className="button save-btn" onClick={handleRemoveFriendClick}>
            RemoveFriend
          </button>
        )}
      </div>
      {friendState.success && (
        <div className="alert success-dialog">{friendState.successMessage}</div>
      )}
      {friendState.error && (
        <div className="alert error-dialog">{friendState.error}</div>
      )}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    profile: state.profile,
    friends: state.friends,
  };
}
export default connect(mapStateToProps)(Profile);
