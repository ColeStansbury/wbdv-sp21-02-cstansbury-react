import React, {useState} from 'react'
import {FaCheck, FaEdit, FaTrash} from 'react-icons/fa';
import {Input, TableCell, TableRow} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";

const CourseRow = ({updateRow, deleteRow, row, columns, useStyles}) => {
    const [editing, setEditing] = useState(false)
    const [newValues, setNewValue] = useState(row)

    const saveRow = () => {
        setEditing(false)
        updateRow(newValues)
    }

    const handleChangeValue = (name, newValue) => {
        setNewValue(() => {
            let newRow = {...newValues}
            newRow[name] = newValue;
            return newRow
        });
    }

    const classes = useStyles();

    return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
            {columns.map((column) =>
                             <TableCell className={`${classes.cell}
                                                    ${column.classes?.map(c => classes[c])}`}
                                        key={`${row._id}-${column.id}`}>
                                 {
                                     (!editing || column.readonly) &&
                                     <>{column.link ?
                                        <>
                                            <Link to={`${column.link}/${row._id}`}>
                                                {newValues[column.id]}
                                            </Link>
                                            <Link style={{float: 'right'}} to={`${row._id}/quizzes`}>
                                                Quizzes
                                            </Link>
                                        </>
                                                    : newValues[column.id]
                                     }</>
                                 }
                                 {
                                     editing && !column.readonly &&
                                     <Input
                                         onChange={(e) =>
                                             handleChangeValue(column.id, e.target.value)}
                                         onKeyDown={
                                             (e) =>
                                                 e.key === "Enter" ? saveRow() : null}
                                         defaultValue={newValues[column.id]}/>
                                 }
                             </TableCell>
            )
            }
            <TableCell align="right">
                <IconButton color={"secondary"} onClick={() => deleteRow(row)}>
                    <FaTrash/>
                </IconButton>
                {editing && <IconButton onClick={() => saveRow()}
                                        color={"primary"}>
                    <FaCheck/>
                </IconButton>}
                {!editing && <IconButton onClick={() => setEditing(true)}
                                         color={"primary"}>
                    <FaEdit/>
                </IconButton>}
            </TableCell>
        </TableRow>)
};

export default CourseRow











