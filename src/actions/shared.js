import { getInitialData } from '../utils/api';
import { receiveUsers } from '../actions/users';
import { receiveQuestions } from '../actions/questions';
import { showLoading, hideLoading } from 'react-redux-loading';
import { saveQuestionAnswer } from '../utils/api';
import { questionAnswer } from '../actions/questions';
import { userAnswer } from '../actions/users';

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(hideLoading());
      })
  }
}

export function handleAnswer (qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
      .then(() => {
        dispatch(questionAnswer({authedUser, qid, answer}));
        dispatch(userAnswer({authedUser, qid, answer}))
      })
  }
}
