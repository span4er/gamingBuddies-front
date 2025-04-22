import React from 'react'
import { Link } from 'react-router-dom'
import './UserInEvent.css'

const UserInEvent = ({ userInEvent }) => {
    // console.log(userInEvent);
  return (
    <Link to={`/users/${userInEvent.userId.userlogin}`} className="user-event-item">
            <img className="user-avatar-image" src={userInEvent.userId.userpicname} alt={userInEvent.gameSession}  />
            <div className="user-event-info">              
                <div className="user-event-name">
                    {userInEvent.userId.userlogin}
                </div>
                <div className="user-event-status">
                    {userInEvent.userId.userbio}
                </div>
            </div>           
        </Link>
  )
}

export default UserInEvent