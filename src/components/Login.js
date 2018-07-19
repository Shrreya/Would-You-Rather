import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';
import user_question from '../assets/user_question.svg';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

// Override theme properties to be used by select & button components
const theme = createMuiTheme({
  palette: {
    primary: { main: '#F85A6A' },
    secondary: { main: '#00897B' }
  }
});

// Slide up transition for snackbar component
function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

class Login extends Component {

  // Component state contains selected user_id, boolean to display snackbar alert
  // & boolean to navigate to home page
  state = {
    user_id: 'none',
    open: false,
    toHome: false
  }

  // Update selected user_id
  handleChange = event => {
    this.setState({ user_id: event.target.value });
  };

  // Handle sign in button click
  handleClick = () => {
    // Display snackbar alert if no user is selected
    if (this.state.user_id === 'none') {
      this.setState({ open: true });
    }
    // Set authed user and navigate to home if user is selected
    else {
      this.props.dispatch(setAuthedUser(this.state.user_id));
      this.setState({ toHome: true });
    }
  }

  // Handle close of snackbar
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {

    const { users } = this.props;

    // Redirect to home page with selected user_id
    if (this.state.toHome) {
      return <Redirect to={{ pathname: '/home' }} />
    }

    return (
      <div className='login'>
        <h1 className='title'>Would You Rather...</h1>
        <div className='login-container'>
          <img className='login-image' src={user_question} alt='login image' />
          <MuiThemeProvider theme={theme}>
            <div className='user-select'>
              <Select
                value={this.state.user_id}
                onChange={this.handleChange}
              >
                <MenuItem value='none'>
                  <em>Who's Playing?</em>
                </MenuItem>
                {
                  Object.keys(users).map((user_id) => (
                    <MenuItem key={user_id} value={user_id}>{users[user_id]['name']}</MenuItem>
                  ))
                }
              </Select>
            </div>
            <Button
              variant='contained'
              color='secondary'
              onClick={this.handleClick}
            >
              Log In
            </Button>
            <Snackbar
              open={this.state.open}
              onClose={this.handleClose}
              TransitionComponent={TransitionUp}
              autoHideDuration={2000}
              message={<span id="message-id">Please select a user before logging in!</span>}
            />
            </MuiThemeProvider>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Login);
