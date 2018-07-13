import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';

class Nav extends Component {

  render() {

    return (
      <div className='nav'>
        {
          this.props.loading
            ? null
            : <ul className='nav-list'>
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
              <li className='nav-item' style={{ float: 'right' }}>
                <NavLink to='/' exact activeClassName='active'>
                  Log out
                </NavLink>
              </li>
              <li className='user-greeting' style={{ float: 'right' }}>
                <span>Hey, {this.props.user_name}!</span>
              </li>
              <li style={{ float: 'right', paddingTop: '2px' }}>
                <Avatar alt='' src={require('../assets/' + this.props.user_avatar)}/>
              </li>
            </ul>
        }
      </div>
    );
  }
}

function mapStateToProps ({ users, authedUser }) {
  const user = users[authedUser];
  return {
    loading: authedUser === null,
    user_name: user ? user['name'] : '',
    user_avatar: user ? user['avatarURL'] : ''
  }
}

export default connect(mapStateToProps)(Nav);
