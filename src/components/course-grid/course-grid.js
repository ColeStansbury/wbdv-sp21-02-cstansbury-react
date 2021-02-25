import React from 'react'
import CrudCard from "./course-card";
import {Grid, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
import {FaTable } from "react-icons/fa";

const CourseGrid = (props) =>
    <div>
        <Grid
            spacing={2}
            container
            direction="row"
            alignItems="center"
        >
            {
                props.cards.map(card =>
                                <Grid key={card._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <CrudCard card={card} fields={props.fields}
                                    updateCard={props.updateCard}
                                    deleteCard={props.deleteCard}/>
                                </Grid>
                )
            }
        </Grid>
    </div>

export default CourseGrid
