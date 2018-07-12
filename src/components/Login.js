import React, { Component } from 'react';
import user_question from '../assets/user_question.svg';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#F85A6A' },
    secondary: { main: '#00897B'}
  }
});

class Login extends Component {

  state = {
    user_id: 'none'
  }

  handleChange = event => {
    this.setState({ user_id: event.target.value });
  };

  handleClick = () => {
    this.state.user_id === 'none' ? console.log('User not selected') :
      console.log('User selected:', this.state.user_id);
  }

  render() {
    return (
      <div>
        <h1 className='title'>Would You Rather...</h1>
        <div className='signin-container'>
          <img className='signin-image' src={user_question} alt='' />
          <MuiThemeProvider theme={theme}>
            <div className='user-select'>
              <Select
                value={this.state.user_id}
                onChange={this.handleChange}
              >
                <MenuItem value='none'>
                  <em>Who's Playing?</em>
                </MenuItem>
                <MenuItem value='sarahedo'>Sarah Edo</MenuItem>
                <MenuItem value='tylermcginnis'>Tyler McGinnis</MenuItem>
                <MenuItem value='johndoe'>John Doe</MenuItem>
              </Select>
            </div>
            <Button
              variant='contained'
              color='secondary'
              onClick={this.handleClick}
            >
              Log In
            </Button>
          </MuiThemeProvider>
        </div>
      </div>
    )
  }
}

export default Login;
