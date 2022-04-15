import { Link } from 'react-router-dom';
const dp =require('./assets/user.png');
function FriendListItem(props)
{  
    return (
        <div >
            <Link className="friends-item" to={`/profile/${props.friend._id}`}>
            <div className="friends-img">
                <img src={dp} alt="user-pic"></img>
            </div>
            <div className='friends-name'>{props.friend.name}</div>
            </Link>
        </div>
    )
}
export default FriendListItem;