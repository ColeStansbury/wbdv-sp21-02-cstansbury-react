import React from "react";
import MultipleChoiceQuestion from './multiple-choice-question';

const TrueFalseQuestion = ({question, setQuestion, grading}) => {

    return (
        <MultipleChoiceQuestion question={{...question,choices: ['TRUE', 'FALSE']}}
                                setQuestion={setQuestion}
                                grading={grading}/>
    )
}

export default TrueFalseQuestion
