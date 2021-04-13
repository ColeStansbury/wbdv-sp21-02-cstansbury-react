const QUIZZES_URL = 'http://localhost:4000/api/quizzes';

const findAllQuizzes = async () => {
    return fetch(QUIZZES_URL)
        .then(response => response.json())
}
const findQuizById = async (qid) => {
    return fetch(`${QUIZZES_URL}/${qid}`)
        .then(response => response.json())
}
export default {
    findAllQuizzes, findQuizById
}

