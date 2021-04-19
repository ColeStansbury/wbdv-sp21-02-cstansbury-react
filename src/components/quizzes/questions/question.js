import React from "react";
import TrueFalseQuestion from "./true-false-question";
import MultipleChoiceQuestion from "./multiple-choice-question";

const Question = ({question, grading, setQuestion}) => {
    return(
        <div>
            {
                question.type === "TRUE_FALSE" &&
                <TrueFalseQuestion question={question}
                                   setQuestion={setQuestion}
                                   grading={grading}/>
            }
            {
                question.type === "MULTIPLE_CHOICE" &&
                <MultipleChoiceQuestion question={question}
                                        setQuestion={setQuestion}
                                        grading={grading}/>
            }
        </div>
    )
}

export default Question
