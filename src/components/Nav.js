import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';

class Nav extends Component {

  render() {

    const { userName, userAvatar } = this.props;

    return (
      <div className='nav'>
        <ul className='nav-list'>
          <li className='nav-item'>
            <NavLink to='/home' activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li className='nav-item logout'>
            <NavLink to='/' exact activeClassName='active'>
              Log out
            </NavLink>
          </li>
          <li className='user-greeting'>
            <span>Hey, {userName}!</span>
          </li>
          <li className='user-avatar'>
            <Avatar alt='' src={require('../assets/' + userAvatar)}/>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps ({ users, authedUser }) {
  const user = users[authedUser];
  return {
    userName: user ? user['name'] : '',
    userAvatar: user ? user['avatarURL'] : ''
  }
}

export default connect(mapStateToProps)(Nav);
