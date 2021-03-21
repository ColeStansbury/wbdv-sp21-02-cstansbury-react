import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import EditableItem from "./editable-item";
import {useParams} from "react-router-dom";
import topicService from '../../services/topic-service'
import {FaPlus} from "react-icons/all";

import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Divider} from "@material-ui/core";

const useStyles = makeStyles({addLessonBtn: {width: '30px', flex: "none"}});

const TopicPills = ({
                        history,
                        topics,
                        findTopicsForLesson,
                        createTopicForLesson,
                        updateTopic,
                        deleteTopic,
                    }) => {
    const {layout, courseId, moduleId, lessonId, topicId} = useParams();
    const classes = useStyles();
    useEffect(() => {
        if (lessonId !== "undefined" && typeof lessonId !== "undefined") {
            findTopicsForLesson(lessonId)
        }
    }, [findTopicsForLesson, lessonId, moduleId])

    return (moduleId && lessonId ?
            <>
                <Divider/>
                <BottomNavigation showLabels value={topics.findIndex(t => t._id === topicId)}
                                  className={classes.root}>
                    {
                        topics.map(topic =>
                                       <BottomNavigationAction key={topic._id}
                                                               onClick={() => history.replace(
                                                                   `/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lessonId}/topics/${topic._id}`)}
                                                               icon={<EditableItem
                                                                   active={topic._id === topicId}
                                                                   item={topic}
                                                                   updateItem={updateTopic}
                                                                   deleteItem={deleteTopic}/>}

                                       />)
                    }
                    <BottomNavigationAction className={classes.addLessonBtn}
                                            onClick={() => createTopicForLesson(lessonId)}
                                            icon={<FaPlus/>}/>
                </BottomNavigation>
            </> : <></>);
}

const stpm = (state) => ({
    topics: state.topicReducer.topics
})
const dtpm = (dispatch) => ({
    findTopicsForLesson: (lessonId) => {
        topicService.findTopicsForLesson(lessonId)
            .then(topics => dispatch({
                                         type: "FIND_TOPICS",
                                         topics
                                     }))
    },
    createTopicForLesson: (lessonId) => {
        topicService
            .createTopicForLesson(lessonId, {title: "New Topic"})
            .then(topic => dispatch({
                                        type: "CREATE_TOPIC",
                                        topic
                                    }));

    },
    updateTopic: (topic) => {
        topicService.updateTopic(topic)
            .then(() => dispatch({
                                     type: "UPDATE_TOPIC",
                                     topic,
                                 }));
    },
    deleteTopic: (topic) => {
        topicService
            .deleteTopic(topic._id)
            .then(() => dispatch({
                                     type: "DELETE_TOPIC",
                                     topicId: topic._id,
                                 }));

    },
});

export default connect(stpm, dtpm)(TopicPills);
