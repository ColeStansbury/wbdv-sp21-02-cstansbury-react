import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import quizService from '../../services/quiz-service';
import {Grid} from '@material-ui/core';

const QuizzesList = () => {
    const {courseId} = useParams()
    const [quizzes, setQuizzes] = useState([])
    useEffect(async () => setQuizzes(await quizService.findAllQuizzes()), [])
    return (
        <div>
            <h2>Quizzes ({quizzes.length})</h2>
            <Grid container>
                {
                    quizzes.map((quiz) => {
                        return (
                            <React.Fragment key={quiz._id}>
                                <Grid item xs={6}>
                                    <Link to={`/courses/${courseId}/quizzes/${quiz._id}`}>
                                        {quiz.title}
                                    </Link>
                                </Grid>
                                <Grid item xs={6}>

                                    <Link to={`/courses/${courseId}/quizzes/${quiz._id}/attempts`}>
                                        Attempts
                                    </Link>
                                </Grid>
                            </React.Fragment>
                        )
                    })
                }
            </Grid>
        </div>
    );
}

export default QuizzesList;
