import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import EditableItem from "./editable-item";
import {useParams} from "react-router-dom";
import lessonService from '../../services/lesson-service'
import {FaPlus} from "react-icons/all";

import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Divider} from "@material-ui/core";

const useStyles = makeStyles({addLessonBtn: {width: '30px', flex: "none"},root:{alignItems:'start'}});

const LessonTabs = ({
                        history,
                        lessons,
                        findLessonsForModule,
                        createLessonForModule,
                        updateLesson,
                        deleteLesson,
                    }) => {
    const {layout, courseId, moduleId, lessonId} = useParams();
    const classes = useStyles();
    useEffect(() => {
        if (moduleId !== "undefined" && typeof moduleId !== "undefined") {
            findLessonsForModule(moduleId)
        }
    }, [findLessonsForModule, moduleId])


    return (moduleId ?
            <>
                <h2>Lessons</h2>
                <Divider/>
                <BottomNavigation showLabels value={lessons.findIndex(l => l._id === lessonId)}
                                  className={classes.root}>
                    {
                        lessons.map(lesson =>
                                        <BottomNavigationAction key={lesson._id}
                                                                onClick={() => history.replace(
                                                                    `/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lesson._id}/topics/`)}
                                                                icon={<EditableItem
                                                                    active={lesson._id === lessonId}
                                                                    item={lesson}
                                                                    updateItem={updateLesson}
                                                                    deleteItem={deleteLesson}/>}

                                        />)
                    }
                    <BottomNavigationAction className={classes.addLessonBtn}
                                            onClick={() => createLessonForModule(moduleId)}
                                            icon={<FaPlus/>}/>
                </BottomNavigation>
            </> : <></>);
}

const stpm = (state) => ({
    lessons: state.lessonReducer.lessons
})
const dtpm = (dispatch) => ({
    findLessonsForModule: (moduleId) => {
        lessonService.findLessonsForModule(moduleId)
            .then(lessons => dispatch({
                                          type: "FIND_LESSONS",
                                          lessons
                                      }))
    },
    createLessonForModule: (moduleId) => {
        lessonService
            .createLessonForModule(moduleId, {title: "New Lesson"})
            .then(lesson => dispatch({
                                         type: "CREATE_LESSON",
                                         lesson
                                     }));

    },
    updateLesson: (lesson) => {
        lessonService.updateLesson(lesson)
            .then(() => dispatch({
                                     type: "UPDATE_LESSON",
                                     lesson
                                 }));
    },
    deleteLesson: (lesson) => {
        lessonService
            .deleteLesson(lesson._id)
            .then(() => dispatch({
                                     type: "DELETE_LESSON",
                                     lessonId: lesson._id
                                 }));

    },
})

export default connect(stpm, dtpm)(LessonTabs)