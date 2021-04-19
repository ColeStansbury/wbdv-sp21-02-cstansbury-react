const QUIZZES_URL = `${process.env.REACT_APP_NODE_SERVER_URL}/quizzes`;

const findQuestionsForQuiz = (qid) => {
    return fetch(`${QUIZZES_URL}/${qid}/questions`)
        .then(response => response.json())
}
export default {
    findQuestionsForQuiz
}
