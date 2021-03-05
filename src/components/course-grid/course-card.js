import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {FaCheck, FaEdit, FaTrash} from "react-icons/fa";
import IconButton from '@material-ui/core/IconButton';
import {Link} from "react-router-dom";
import {Input} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    actions: {
        justifyContent: "flex-end",
    }
}));

export default function CourseCard({updateCard, deleteCard, card, fields}) {
    const classes = useStyles();
    const [editing, setEditing] = useState(false);
    const [newValues, setNewValue] = useState(card)

    const saveCard = () => {
        setEditing(false);
        updateCard(newValues)
    }

    const handleChangeValue = (name, newValue) => {
        setNewValue(() => {
            let newRow = {...newValues}
            newRow[name] = newValue;
            return newRow
        });
    }
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2">
                    {card.title}

                </Typography>
                <Typography variant="body2" component="p">
                    {fields.map((field, ndx) => {
                        return (<React.Fragment key={ndx}>{field.label}: {
                                (!editing || field.readonly) &&
                                <>{field.link ?
                                   <Link to={`${field.link}/${card._id}`}>
                                       {newValues[field.id]}
                                   </Link> : newValues[field.id]
                                }</>
                            }
                                {
                                    editing && !field.readonly &&
                                    <Input
                                        onChange={(e) =>
                                            handleChangeValue(field.id, e.target.value)}
                                        onKeyDown={
                                            (e) =>
                                                e.key === "Enter" ? saveCard() : null}
                                        value={newValues[field.id]}/>

                                }<br/></React.Fragment>
                        )
                    })}
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <IconButton color={"secondary"} onClick={() => deleteCard(card)}>
                    <FaTrash/>
                </IconButton>
                {(!editing &&
                  <IconButton onClick={() => setEditing(true)} color={"primary"}>
                      <FaEdit/>
                  </IconButton>)}
                {(editing &&
                  <IconButton  onClick={() => saveCard()} color={"primary"}>
                      <FaCheck/>
                  </IconButton>)}
            </CardActions>
        </Card>
    );
}












