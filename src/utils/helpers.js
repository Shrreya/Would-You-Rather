export function sortByTime(questions, questionIds) {
  return questionIds
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
}

export function getUnanswered(questionIds, answeredIds) {
  return questionIds
    .filter(questionId => !(answeredIds.includes(questionId)));
}
