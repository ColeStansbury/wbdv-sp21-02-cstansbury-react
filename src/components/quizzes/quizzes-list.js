import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import quizService from '../../services/quiz-service';

const QuizzesList = () => {
    const {courseId} = useParams()
    const [quizzes, setQuizzes] = useState([])
    useEffect(async () => setQuizzes(await quizService.findAllQuizzes()), [])
    return (
        <div>
            <h2>Quizzes ({quizzes.length})</h2>
            <ul style={{listStyle: 'none'}}>
                {
                    quizzes.map((quiz) => {
                        return (
                            <li>
                                <Link to={`/courses/${courseId}/quizzes/${quiz._id}`}>
                                    {quiz.title}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default QuizzesList;
