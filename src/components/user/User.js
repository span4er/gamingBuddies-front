import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <Link to={`/users/${user.username}`} className="contact__item">
            <div className="contact__header">
                <div className="contact__image">
                    <img src={user.userpicname} alt={user.username}  />
                </div>
                <div className="contact__details">
                    <p className="contact_name">{user.username.substring(0, 15)} </p>
                </div>
            </div>
            <div className="contact__body">
                <p><i className="bi bi-envelope"></i> {user.userbio.substring(0, 20)} </p>
            </div>
        </Link>
  )
}

export default User