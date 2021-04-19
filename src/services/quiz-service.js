const QUIZZES_URL = `${process.env.REACT_APP_NODE_SERVER_URL}/quizzes`


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

