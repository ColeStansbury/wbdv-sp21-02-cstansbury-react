import {useParams} from 'react-router';
import React, {useEffect, useState} from 'react';
import attemptService from '../../services/attemptService';
import {Grid} from '@material-ui/core';

const QuizAttempts = () => {
    const {quizId} = useParams();
    const [attempts, setAttempts] = useState([]);
    useEffect(async () => setAttempts(await attemptService.findAttemptsForQuiz(quizId)),
              []);

    return (<>

        <Grid container>
            <Grid item xs={4}>
                <h1>Attempt Id</h1>
            </Grid>
            <Grid item xs={4}>
                <h1>Number of Questions</h1>
            </Grid>
            <Grid item xs={4}>
                <h1>Score</h1>
            </Grid>
        </Grid>

        {attempts?.map(a =>

                           <Grid container>
                               <Grid item xs={4}>
                                   {a._id}
                               </Grid>
                               <Grid xs={4}>
                                   {a.answers.length}
                               </Grid>
                               <Grid item xs={4}>
                                   {a.score}
                               </Grid>
                           </Grid>
        )}

    </>)
}
export default QuizAttempts;
