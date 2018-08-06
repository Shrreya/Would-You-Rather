import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleSaveQuestion } from '../actions/shared';
import Nav from './Nav';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../utils/theme';

class NewQuestion extends Component {

  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
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
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    this.props.dispatch(handleSaveQuestion(optionOneText, optionTwoText));
    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true
    }));
  }

  render() {

    const { optionOneText, optionTwoText, toHome } = this.state;

    if (toHome) {
      return <Redirect to={{ pathname: '/home' }} />
    }

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

export default connect()(NewQuestion);
