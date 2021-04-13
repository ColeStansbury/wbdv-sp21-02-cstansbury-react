import React, {useState} from "react";
import {FaCheck} from 'react-icons/fa';
import {FaTimes} from 'react-icons/all';
import {Button} from '@material-ui/core';

const MultipleChoiceQuestion = ({question}) => {
    const [yourAnswer, setYourAnswer] = useState("")
    const [grading, setGrading] = useState(false)
    const check = <FaCheck style={{color: 'green'}}/>
    const times = <FaTimes style={{color: 'red'}}/>
    return (
        <div>
            <h5 style={{display: 'inline', marginRight: '10px'}}> {question.question} </h5>
            {grading &&
             <>
                 {question.correct.toUpperCase() === yourAnswer.toUpperCase() && check}
                 {question.correct.toUpperCase() !== yourAnswer.toUpperCase() && times}
             </>
            }
            <ul style={{listStyle: 'none'}} className="list-group">
                {
                    question.choices.map((choice) => {
                        return (
                            <li style={grading ? {
                                width: '30%',
                                backgroundColor: `
                            ${grading && choice === yourAnswer ?
                              yourAnswer.toUpperCase() !== question.correct.toUpperCase()
                              ? '#ffbcb5' : 'rgb(167 219 167)' : choice === question.correct
                                                                 ? 'rgb(167 219 167)' : ''
                                }`
                            } : {}}
                            >
                                <label><input
                                    onClick={() => {
                                        setYourAnswer(choice)
                                    }}
                                    type="radio"
                                    name={question._id}/> {choice}</label>
                                {grading &&
                                 <>
                                     {choice.toUpperCase() === question.correct.toUpperCase()
                                      && check}
                                     {choice.toUpperCase() === yourAnswer.toUpperCase()
                                      && yourAnswer.toUpperCase() !== question.correct.toUpperCase()
                                      && times}
                                 </>
                                }
                            </li>
                        )
                    })
                }
            </ul>
            {grading &&
             <>
                 <p>
                     Your answer: {yourAnswer}
                 </p>
                 <p>Correct answer: {question.correct}</p>
             </>
            }
            <Button variant='contained' color='primary'
                    onClick={() => setGrading(!grading)}>{grading ? 'Hide' : 'Grade'}</Button>
        </div>
    )
}

export default MultipleChoiceQuestion
