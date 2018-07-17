import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';
import { Line } from 'rc-progress';

class QuestionPage extends Component {

  render() {

    const { id, hasAnswered, authorName, authorAvatar, optionOne, optionTwo,
      optionChosen, optionOneVotes, optionTwoVotes } = this.props;

    const totalVotes = optionOneVotes + optionTwoVotes;
    const optionOnePerc = ((optionOneVotes / totalVotes ) * 100).toString();
    const optionTwoPerc = ((optionTwoVotes / totalVotes ) * 100).toString();

    return (
      <div className='question-page'>
        <Nav />
        <img className='big-avatar' alt='' src={require('../assets/' + authorAvatar)}/>
        <span className='author-prompt'>{authorName} asks</span>
        <h2>Would you rather ...</h2>
        {
          hasAnswered && optionChosen === 'optionOne' && <div>
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
          hasAnswered && optionChosen === 'optionTwo' && <div>
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
            <div className='option-open'>
              {optionOne}?
            </div>
            <div className='option-open'>
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
  const optionChosen = hasAnswered ? users[authedUser]['answers'][id] : '';
  return {
    id,
    hasAnswered,
    authorName: users[question['author']]['name'],
    authorAvatar: users[question['author']]['avatarURL'],
    optionOne: question['optionOne']['text'],
    optionTwo: question['optionTwo']['text'],
    optionChosen,
    optionOneVotes: question['optionOne']['votes'].length,
    optionTwoVotes: question['optionTwo']['votes'].length
  }
}

export default connect(mapStateToProps)(QuestionPage);
