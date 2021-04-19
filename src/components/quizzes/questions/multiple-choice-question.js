import React, {useState} from "react";
import {FaCheck} from 'react-icons/fa';
import {FaTimes} from 'react-icons/all';
import {Button} from '@material-ui/core';

const MultipleChoiceQuestion = ({question, setQuestion, grading}) => {
    const check = <FaCheck style={{color: 'green'}}/>
    const times = <FaTimes style={{color: 'red'}}/>
    return (
        <div>
            <h5 style={{display: 'inline', marginRight: '10px'}}> {question.question} </h5>
            {grading &&
             <>
                 {question.correct.toUpperCase() === question.answer?.toUpperCase() && check}
                 {question.correct.toUpperCase() !== question.answer?.toUpperCase() && times}
             </>
            }
            <ul style={{listStyle: 'none'}} className="list-group">
                {
                    question.choices.map((choice) => {
                        return (
                            <li key={choice} style={grading ? {
                                width: '30%',
                                backgroundColor: `
                            ${grading && choice.toUpperCase() === question.answer?.toUpperCase() ?
                              question.answer?.toUpperCase() !== question.correct.toUpperCase()
                              ? '#ffbcb5' : 'rgb(167 219 167)' : choice.toUpperCase() === question.correct.toUpperCase()
                                                                 ? 'rgb(167 219 167)' : ''
                                }`
                            } : {}}
                            >
                                <label><input
                                    onClick={() => {
                                        setQuestion({...question, answer: choice})
                                    }}
                                    type="radio"
                                    name={question._id}/> {choice}</label>
                                {grading &&
                                 <>
                                     {choice.toUpperCase() === question.correct.toUpperCase()
                                      && check}
                                     {choice.toUpperCase() === question.answer?.toUpperCase()
                                      && question.answer?.toUpperCase() !== question.correct.toUpperCase()
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
                     Your answer: {question.answer}
                 </p>
                 <p>Correct answer: {question.correct}</p>
             </>
            }
        </div>
    )
}

export default MultipleChoiceQuestion
