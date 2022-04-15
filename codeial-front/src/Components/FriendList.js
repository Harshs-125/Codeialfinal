import React from 'react';
import {FriendListItem} from './';
import {connect} from 'react-redux'
function FriendList(props) {
    return (
        <div className='friends-list'>
            <div className='header'>Friends</div>
            {props.friends&&props.friends.length===0&&(
            <div className="no-friends">No friends Found</div>
            )}
            {props.friends&&
            props.friends.map((friend)=>(
                <FriendListItem friend={friend.to} key={friend._id} />
            ))}
        </div>
    );
}
function mapStateToProps(state)
{   
    return{
        friends:state.friends,
        auth:state.auth
    }
}
export default connect(mapStateToProps)(FriendList);