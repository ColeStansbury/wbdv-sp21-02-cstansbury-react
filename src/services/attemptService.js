const ATTEMPTS_URL = `${process.env.REACT_APP_NODE_SERVER_URL}/quizzes`

const findAttemptsForQuiz = async (qid) => fetch(`${ATTEMPTS_URL}/${qid}/attempts`)
    .then(r => r.json())

const createAttempt = (qid, attempt) => fetch(`${ATTEMPTS_URL}/${qid}/attempts`,
                                              {
                                                  method: "POST",
                                                  body: JSON.stringify(attempt),
                                                  headers: {
                                                      'content-type': 'application/json'
                                                  }
                                              }
).then(res => res.json())
export default {findAttemptsForQuiz, createAttempt}
