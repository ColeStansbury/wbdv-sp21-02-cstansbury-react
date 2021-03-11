import React from 'react'
import {Link, useParams} from "react-router-dom";
import moduleReducer from "../../reducers/modules-reducer";
import lessonReducer from "../../reducers/lesson-reducer";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import ModuleList from "./module-list";
import LessonTabs from "./lesson-tabs";
import {FaArrowLeft, FaTimes} from "react-icons/all";
import {Container, Grid} from "@material-ui/core";
import topicReducer from "../../reducers/topic-reducer";
import TopicPills from "./topic-pills";

const reducer = combineReducers({
                                    moduleReducer: moduleReducer,
                                    lessonReducer: lessonReducer,
                                    topicReducer: topicReducer,
                                })

const store = createStore(reducer)

const CourseEditor = (props) => {
    const {layout} = useParams();
    return (
        <Provider store={store}>
            <Container>
                <h2>
                    <Link to={`/courses/${layout}`}>
                        <FaArrowLeft/>
                    </Link>
                    Course Editor
                    <FaTimes onClick={() => props.history.replace(`/courses/${layout}`)}/>
                </h2>
                <Grid container>
                    <Grid item xs={4}>
                        <ModuleList {...props}/>
                    </Grid>
                    <Grid item xs={8}>
                        <LessonTabs {...props}/>
                        <TopicPills {...props}/>
                    </Grid>
                </Grid>
            </Container>
        </Provider>)
}

export default CourseEditor
