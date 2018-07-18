export function sortByTime(questions, questionIds) {
  return questionIds
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
}

export function getUnanswered(questionIds, answeredIds) {
  return questionIds
    .filter(questionId => !(answeredIds.includes(questionId)));
}

export function formatDate (timestamp) {
  const d = new Date(timestamp);
  return d.toLocaleTimeString('en-US') + ' | ' + d.toLocaleDateString();
}

export function getPercentVotes (optionVotes, totalVotes) {
  return Math.round((optionVotes / totalVotes ) * 100).toString();
}

export function formatQuestion (question, users, authedUser) {
  const { id } = question;
  const hasAnswered = Object.keys(users[authedUser]['answers']).includes(id);
  const answer = hasAnswered ? users[authedUser]['answers'][id] : '';
  return {
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
