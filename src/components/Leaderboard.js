import React, { Component } from 'react';
import { connect } from 'react-redux';
import { prepareLeaderBoard } from '../utils/helpers';
import Nav from './Nav';

class Leaderboard extends Component {

  render() {

    const { leaderboard } = this.props;

    return (
      <div className='leaderboard'>
        <Nav />
        <ul>
          {leaderboard.map((leader) => (
            <li key={leader['id']}>{leader['name']}</li>
          ))}
        </ul>
      </div>

    );
  }
}

function mapStateToProps({ users }) {
  return {
    leaderboard : prepareLeaderBoard(users)
  }
}

export default connect(mapStateToProps)(Leaderboard);
