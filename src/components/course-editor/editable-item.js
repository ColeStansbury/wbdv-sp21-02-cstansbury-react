import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {FaCheck, FaEdit} from "react-icons/fa";
import {FaTimes} from "react-icons/all";
import {Input} from "@material-ui/core";


const EditableItem = (
    {
        to,
        deleteItem,
        updateItem,
        item,
        active
    }) => {
    const [editing, setEditing] = useState(false)
    const [cachedItem, setCashedItem] = useState(item)
    return (
        <>
            {
                !editing &&
                <>
                    {to ? <Link to={to}>{item.title} </Link> : item.title}
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