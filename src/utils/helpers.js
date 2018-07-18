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
