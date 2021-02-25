import React from 'react'
import {Link} from "react-router-dom";
import {FaArrowLeft, FaTimes} from "react-icons/all";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary, Breadcrumbs, Button, Chip, Divider,
    IconButton, makeStyles
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '20px 0'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

// const CourseEditor = ({props}) =>
const CourseEditor = ({history}) => {
    const classes = useStyles();
    return (
        <>
            <h2>
                <IconButton onClick={() => history.goBack()} color="primary">
                    <FaArrowLeft/>
                </IconButton>
                Course Editor
                <IconButton onClick={() => history.goBack()} color="secondary">
                    <FaTimes/>
                </IconButton>
            </h2>
            {["Jquery", "React", "Redux", "Native", "Angular", "Node", "Mongo"]
                .map((mod, ndx) =>

                         <div className={classes.root}>
                             <Accordion>
                                 <AccordionSummary
                                     expandIcon={<ExpandMoreIcon/>}
                                     aria-controls="panel1c-content"
                                     id="panel1c-header"
                                 >
                                     <div className={classes.column}>
                                         <Typography className={classes.heading}>Module {ndx+1} {mod}</Typography>
                                     </div>
                                     <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>}
                                                  aria-label="breadcrumb">
                                         {[1, 2, 3, 4].map((subNdx) =>
                                                                  <Link color="inherit" href="/">
                                                                      Topic {ndx+1}.{subNdx}
                                                                  </Link>
                                         )}
                                     </Breadcrumbs>
                                 </AccordionSummary>
                                 <AccordionDetails className={classes.details}>

                                 </AccordionDetails>
                                 <Divider/>
                                 <AccordionActions>
                                     <Button size="small">Cancel</Button>
                                     <Button size="small" color="primary">
                                         Save
                                     </Button>
                                 </AccordionActions>
                             </Accordion>
                         </div>
                )}
        </>
    )
}

export default CourseEditor
