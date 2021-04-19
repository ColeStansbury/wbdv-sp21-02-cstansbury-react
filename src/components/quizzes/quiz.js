import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import Question from "./questions/question";
import questionService from '../../services/questions-service';
import {Button} from '@material-ui/core';
import attemptService from '../../services/attemptService';

const Quiz = () => {
    const [grading, setGrading] = useState(false)
    const {quizId} = useParams()
    const [questions, setQuestions] = useState([])
    useEffect(async () => setQuestions(await questionService.findQuestionsForQuiz(quizId)), [])

    const handleSubmit = () => {
        if (!grading) {
            attemptService.createAttempt(quizId, questions);
        }
        setGrading(!grading)
    };
    return (
        <div>
            <h3>Quiz {quizId}</h3>
            <ul style={{listStyle: 'none'}}>
                {
                    questions?.map((question, ndx) => {
                        return (
                            <li key={question._id}>
                                <Question question={question}
                                          setQuestion={(q) => {
                                              questions[ndx] = q;
                                              setQuestions([...questions])
                                          }}
                                          grading={grading}/>
                            </li>
                        )
                    })
                }
            </ul>

            <Button variant='contained' color='primary'
                    onClick={handleSubmit}>{grading ? 'Retry' : 'Submit'}</Button>
        </div>
    )
}

export default Quiz;
