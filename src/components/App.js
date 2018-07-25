import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import Login from './Login';
import Home from './Home';
import QuestionPage from './QuestionPage';
import Leaderboard from './Leaderboard';
import NewQuestion from './NewQuestion';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar style={{ backgroundColor: '#00897B'}} />
          {
            this.props.loading
              ? null
              : <div className='app'>
                <Route exact path='/' component={Login} />
                <Route exact path='/home' component={Home} />
                <Route path='/questions/:id' component={QuestionPage} />
                <Route exact path='/leaderboard' component={Leaderboard} />
                <Route exact path='/add' component={NewQuestion} />
              </div>
          }
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    loading: users === {}
  }
}

export default connect(mapStateToProps)(App);
