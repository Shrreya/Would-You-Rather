import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
  render() {
    return(
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
          <li className='nav-item' style={{ float: 'right' }}>
            <NavLink to='/' exact activeClassName='active'>
              Log out
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
