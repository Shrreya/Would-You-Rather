import React, { Component } from 'react';
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
        {
          this.props.loading
            ? <LoadingBar style={{ backgroundColor: '#00897B'}}/>
            : <div className='app'>
              <Route exact path='/' component={Login} />
              <Route exact path='/home' component={Home} />
              <Route path='/questions/:id' component={QuestionPage} />
              <Route exact path='/leaderboard' component={Leaderboard} />
              <Route exact path='/add' component={NewQuestion} />
            </div>
        }
      </Router>
    );
  }
}

function mapStateToProps({ questions }) {
  return {
    loading: questions === {}
  }
}

export default connect(mapStateToProps)(App);
