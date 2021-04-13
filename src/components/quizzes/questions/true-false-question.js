import React from "react";
import MultipleChoiceQuestion from './multiple-choice-question';

const TrueFalseQuestion = ({question}) => {

    return (
        <MultipleChoiceQuestion question={{...question, choices: ['TRUE', 'FALSE']}}/>
    )
}

export default TrueFalseQuestion
