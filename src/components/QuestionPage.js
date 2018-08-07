// Packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'rc-progress';
// Components
import Nav from './Nav';
import LoginRedirect from './LoginRedirect';
// Assets
import check from '../assets/check.svg';
// Action Creators
import { handleAnswer } from '../actions/shared';
// Utils
import { getPercentVotes, formatQuestion } from '../utils/helpers';

class QuestionPage extends Component {

  handleClick = (answer) => {
    const { dispatch, qid } = this.props;
    dispatch(handleAnswer(qid, answer));
  }

  render() {

    // Redirect to login page if app is in logged out state
    if (this.props.loggedOut) {
      return <LoginRedirect afterLogin={`/questions/${this.props.qid}`}/>
    }

    const { question } = this.props;

    if (question === null) {
      return (
        <div className='question-page'>
          <Nav />
          <p>This question does not exist!</p>
        </div>
      );
    }

    const { hasAnswered, authorName, authorAvatar, optionOne, optionTwo,
      answer, optionOneVotes, optionTwoVotes } = question;

    const totalVotes = optionOneVotes + optionTwoVotes;
    const optionOnePerc = getPercentVotes(optionOneVotes, totalVotes);
    const optionTwoPerc = getPercentVotes(optionTwoVotes, totalVotes);

    return (
      <div className='question-page'>
        <Nav />
        <img className='big-avatar' alt='big avatar' src={require('../assets/' + authorAvatar)}/>
        <span className='author-prompt'>{authorName} asks</span>
        <h2>Would you rather ...</h2>
        {
          hasAnswered && answer === 'optionOne' && <div>
            <div className='option-close option-chosen'>
              <div className='text-chosen'><strong>{optionOne}?</strong></div>
              <Line percent={optionOnePerc} strokeColor='#00897B' className='percentage'/>
              <span>{optionOnePerc}%</span>
              <div>{optionOneVotes} out of {totalVotes} votes</div>
              <img alt='badge' src={check} className='badge'/>
            </div>
            <div className='option-close'>
              <div><strong>{optionTwo}?</strong></div>
              <Line percent={optionTwoPerc} strokeColor='#00897B' className='percentage'/>
              <span>{optionTwoPerc}%</span>
              <div>{optionTwoVotes} out of {totalVotes} votes</div>
            </div>
          </div>
        }
        {
          hasAnswered && answer === 'optionTwo' && <div>
            <div className='option-close'>
              <div><strong>{optionOne}?</strong></div>
              <Line percent={optionOnePerc} strokeColor='#00897B' className='percentage'/>
              <span>{optionOnePerc}%</span>
              <div>{optionOneVotes} out of {totalVotes} votes</div>
            </div>
            <div className='option-close option-chosen'>
              <div className='text-chosen'><strong>{optionTwo}?</strong></div>
              <Line percent={optionTwoPerc} strokeColor='#00897B' className='percentage'/>
              <span>{optionTwoPerc}%</span>
              <div>{optionTwoVotes} out of {totalVotes} votes</div>
              <img alt='badge' src={check} className='badge'/>
            </div>
          </div>
        }
        {
          !(hasAnswered) && <div>
            <div className='option-open' onClick={() => this.handleClick('optionOne')}>
              {optionOne}?
            </div>
            <div className='option-open' onClick={() => this.handleClick('optionTwo')}>
              {optionTwo}?
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({authedUser, questions, users}, props) => {
  const { id } = props.match.params;
  const question = questions[id];
  return {
    loggedOut: authedUser === null,
    qid: id,
    question: question ? formatQuestion(question, users, authedUser) : null
  }
};

export default connect(mapStateToProps)(QuestionPage);
