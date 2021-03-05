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
import TopicPills from "./topic-pills";

const useStyles = makeStyles({addLessonBtn:{width: '30px', flex: "none"}, });

const LessonTabs = ({
                        lessons,
                        findLessonsForModule,
                        createLessonForModule,
                        updateLessonForModule,
                        deleteLessonFromModule,
                    }) => {
    const {courseId, moduleId, lessonId} = useParams();
    const classes = useStyles();
    useEffect(() => {
        if (moduleId !== "undefined" && typeof moduleId !== "undefined") {
            findLessonsForModule(moduleId)
        }
    }, [findLessonsForModule, moduleId])
    const [active, setActive] = useState();

    const handleChange = (event, isActive) => {
        setActive(isActive);
    };

    return (moduleId ?
        <>
            <h2>Lessons</h2>
            <Divider/>
            <BottomNavigation showLabels value={active} onChange={handleChange}
                              className={classes.root}>
                {
                    lessons.map(lesson =>
                                    <BottomNavigationAction key={lesson._id}
                                                            icon={<EditableItem
                                                                active={lesson._id === lessonId}
                                                                to={`/courses/editor/${courseId}/${moduleId}/${lesson._id}`}
                                                                item={lesson}
                                                                updateItem={updateLessonForModule}
                                                                deleteItem={deleteLessonFromModule}/>}

                                    />)
                }
                <BottomNavigationAction className={classes.addLessonBtn} onClick={() => createLessonForModule(moduleId)}
                                        icon={<FaPlus/>}/>
            </BottomNavigation>
            <TopicPills/>
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
    updateLessonForModule: (lesson) => {
        lessonService.updateLessonForModule(lesson)
            .then(() => dispatch({
                                     type: "UPDATE_LESSON",
                                     lesson
                                 }));
    },
    deleteLessonFromModule: (lesson) => {
        lessonService
            .deleteLessonFromModule(lesson._id)
            .then(() => dispatch({
                                         type: "DELETE_LESSON",
                                         lessonId: lesson._id
                                     }));

    },
})

export default connect(stpm, dtpm)(LessonTabs)