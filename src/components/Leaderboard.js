import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { prepareLeaderBoard } from '../utils/helpers';
import Nav from './Nav';
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// Customised Material UI Table Cell
const LeaderTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#00897B',
    color: theme.palette.common.white,
    fontWeight: 500,
    fontSize: 14
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

class Leaderboard extends Component {

  render() {

    if (this.props.loggedOut) {
      return <Redirect to={{
        pathname: '/',
        state: {
          afterLogin: '/leaderboard'
        }
      }} />
    }

    const { leaderboard } = this.props;

    return (
      <div className='leaderboard'>
        <Nav />
        <div className='leaderboard-table'>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <LeaderTableCell>Leader</LeaderTableCell>
                  <LeaderTableCell numeric>Questions</LeaderTableCell>
                  <LeaderTableCell numeric>Answers</LeaderTableCell>
                  <LeaderTableCell numeric>Score</LeaderTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map(leader => {
                  return (
                    <TableRow key={leader.id}>
                      <LeaderTableCell component="th" scope="row">
                        <img
                          alt='avatar'
                          src={require('../assets/' + leader.avatarURL)}
                          className='small-avatar'
                        />
                        <span className='leader-name'>{leader.name}</span>
                      </LeaderTableCell>
                      <LeaderTableCell numeric>{leader.questions.length}</LeaderTableCell>
                      <LeaderTableCell numeric>{Object.keys(leader.answers).length}</LeaderTableCell>
                      <LeaderTableCell numeric>{leader.score}</LeaderTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    loggedOut: authedUser === null ,
    leaderboard : prepareLeaderBoard(users)
  }
}

export default connect(mapStateToProps)(Leaderboard);
