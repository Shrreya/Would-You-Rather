import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Nav from './Nav';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Override theme properties to be used by tab components
const theme = createMuiTheme({
  palette: {
    primary: { main: '#00897B' }
  }
});

class Home extends Component {

  // State contains a toggle value for unanswered & answered questions.
  // Default value is set to unanswered.
  state = {
    value: 0,
  };

  // Handle toggle between unanswered & answered questions
  handleChange = (event, value) => {
    this.setState({ value });
  };

  // Fetch all data on mount
  componentDidMount() {
    this.props.dispatch(handleInitialData(this.props.location.state.user_id));
  }

  render() {
    return (
      <div className='home'>
        <Nav />
        <MuiThemeProvider theme={theme}>
          <div style={{
            border: '0.5px solid #e7e7e7',
            margin: '50px 150px 0px'
          }}>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Unanswered" />
              <Tab label="Answered" />
            </Tabs>
          </div>
        </MuiThemeProvider>
        <div style={{ border: '0.5px solid #e7e7e7', margin: '0px 150px'}}>
          <ul>
            {this.props.questionIds.map((id) => (
              <li key={id}>
                <div>QUESTION ID: {id}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions }) {
  return {
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Home);
