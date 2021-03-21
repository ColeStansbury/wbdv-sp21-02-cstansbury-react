import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
                                 root: {
                                     display: 'inline',
                                 },
                             })

const ParagraphWidget = ({widget, editing, changeEditingWidget}) => {
    const classes = useStyles();
    return (
        <>
            {
                editing &&
                <>
                    <textarea onChange={(e) =>
                        changeEditingWidget({...widget, text: e.target.value})}
                              defaultValue={widget.text}/>
                </>
            }
            {
                !editing &&
                <p className={classes.root}>
                    {widget.text}
                </p>
            }
        </>
    )
};

export default ParagraphWidget
