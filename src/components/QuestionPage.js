import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';
import { Line } from 'rc-progress';
import { handleAnswer } from '../actions/shared';
import { getPercentVotes } from '../utils/helpers';

class QuestionPage extends Component {

  handleClick = (answer) => {
    const { dispatch, qid } = this.props;
    dispatch(handleAnswer(qid, answer));
  }

  render() {

    const { hasAnswered, authorName, authorAvatar, optionOne, optionTwo,
      answer, optionOneVotes, optionTwoVotes } = this.props;

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

function mapStateToProps({authedUser, questions, users}, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const hasAnswered = Object.keys(users[authedUser]['answers']).includes(id);
  const answer = hasAnswered ? users[authedUser]['answers'][id] : '';
  return {
    qid: id,
    hasAnswered,
    authorName: users[question['author']]['name'],
    authorAvatar: users[question['author']]['avatarURL'],
    optionOne: question['optionOne']['text'],
    optionTwo: question['optionTwo']['text'],
    answer,
    optionOneVotes: question['optionOne']['votes'].length,
    optionTwoVotes: question['optionTwo']['votes'].length
  }
}

export default connect(mapStateToProps)(QuestionPage);
