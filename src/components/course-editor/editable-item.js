import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {FaCheck, FaEdit} from "react-icons/fa";
import {FaTimes} from "react-icons/all";
import {makeStyles} from "@material-ui/core/styles";
import {Input} from "@material-ui/core";

const useStyles = makeStyles({link: {width: '100%'}})

const EditableItem = (
    {
        to,
        deleteItem,
        updateItem,
        item = {title: "Some Title", _id: "ABC"},
        active
    }) => {
    const [editing, setEditing] = useState(false)
    const [cachedItem, setCashedItem] = useState(item)
    const classes = useStyles();
    return (
        <>
            {
                !editing &&
                <>
                    {to ? <Link className={classes.link} to={to}>{item.title} </Link> : item.title}
                    <FaEdit onClick={() => setEditing(true)}/>
                </>
            }
            {
                editing &&
                <>
                    <input
                        onChange={(e) =>
                            setCashedItem({
                                              ...cachedItem,
                                              title: e.target.value
                                          })}
                        value={cachedItem.title}
                        onKeyDown={
                            (e) => {
                                if (e.key === "Enter") {
                                    setEditing(false);
                                    updateItem(cachedItem);
                                }
                            }}
                    />
                    <FaCheck onClick={() => {
                        setEditing(false);
                        updateItem(cachedItem);
                    }}/>
                    <FaTimes onClick={() => deleteItem(item)}/>
                </>
            }
        </>
    )
};

export default EditableItem