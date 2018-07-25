import React, { Component } from 'react';
import Nav from './Nav';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Override theme properties to be used by button components
const theme = createMuiTheme({
  palette: {
    primary: { main: '#00897B' }
  }
});

class NewQuestion extends Component {

  state = {
    optionOneText: '',
    optionTwoText: ''
  }

  handleOneChange = (e) => {
    const optionOneText = e.target.value;
    this.setState(() => ({
      optionOneText
    }));
  }

  handleTwoChange = (e) => {
    const optionTwoText = e.target.value;
    this.setState(() => ({
      optionTwoText
    }));
  }

  handleSubmit = (e) => {
    // TODO: add new question to store & redirect to home page
    e.preventDefault();
    this.setState(() => ({
      optionOneText: '',
      optionTwoText: ''
    }));
  }

  render() {

    const { optionOneText, optionTwoText } = this.state;

    return (
      <div className='new-question'>
        <Nav />
        <h3>Add Your Question</h3>
        <h2>Would You Rather ...</h2>
        <textarea
          className='textarea'
          placeholder='Enter Option One Here'
          value={optionOneText}
          onChange={this.handleOneChange}
        />
        <textarea
          className='textarea'
          placeholder='Enter Option Two Here'
          value={optionTwoText}
          onChange={this.handleTwoChange}
        />
        <MuiThemeProvider theme={theme}>
          <Button
            variant='outlined'
            size='small'
            color='primary'
            onClick={this.handleSubmit}
            disabled={optionOneText === '' || optionTwoText === ''}
          >
            Submit
          </Button>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default NewQuestion;
