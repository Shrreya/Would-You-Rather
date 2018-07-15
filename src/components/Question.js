import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Override theme properties to be used by button components
const theme = createMuiTheme({
  palette: {
    primary: { main: '#00897B' }
  }
});

class Question extends Component {

  render() {

    return (
      <div className='question'>
        <Avatar alt='' src={require('../assets/sarahedo.jpg')}/>
        <div className='question-info'>
          <span className='author'>Sarah Edo</span>
          <div className='date'>15/07/2018</div>
          <h3>Would you rather</h3>
          <span className='option-preview'>have horrible short term ...</span>
        </div>
        <div className='view-button-container'>
          <MuiThemeProvider theme={theme}>
            <Button
              variant='outlined'
              size='small'
              color='primary'
            >
              View
            </Button>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default Question;
