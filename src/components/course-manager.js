import React from 'react'
import CourseEditor from "./course-editor/course-editor";
import {Route, Link, Redirect} from "react-router-dom";
import {withRouter} from "react-router";
import courseService from "../services/course-service";
import {CourseTable} from "./course-table/course-table";
import Container from "@material-ui/core/Container";
import {FaHome, FaPlus, FaTh} from "react-icons/all";
import {makeStyles} from "@material-ui/core/styles";
import './course-manager.css'
import {Input, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {FaTable} from "react-icons/fa";
import CourseGrid from "./course-grid/course-grid";

const tableStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    cell: {
        fontSize: '16px'
    },
    smDown: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    mdDown: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    }
}));

class CourseManager extends React.Component {
    state = {
        courses: [],
        editableFields: [],
        newCourseTitle: ""
    }

    constructor(props, context) {
        super(props, context);
        this.addCourse = this.addCourse.bind(this);
        this.setNewTitle = this.setNewTitle.bind(this);
        this.getFields = this.getFields.bind(this);
    }

    getCurrentDate() {
        let current = new Date();
        let cDate = (current.getMonth() + 1) + '/' + current.getDate() + '/'
                    + current.getFullYear();
        let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        return cDate + ' ' + cTime;
    }

    updateCourse = (course) => {
        course.lastModified = this.getCurrentDate();
        courseService.updateCourse(course._id, course)
            .then(() => this.setState((prevState) => ({
                ...prevState,
                courses: prevState.courses.map(
                    (c) => c._id === course._id ? course : c)
            })))
    }

    componentDidMount = () => {
        courseService.findAllCourses()
            .then(courses => this.setState({courses}));
    }

    getFields = () => {
        let layout = this.props.match.params.layout
        return [
            {
                id: "title",
                label: "Title",
                link: `/courses/${layout}/edit`,
                readonly: false
            },
            {id: "owner", label: "Owner", classes: ['smDown'], readonly: false},
            {id: "lastModified", label: "Last Modified", classes: ['mdDown'], readonly: true}
        ]
    }

    addCourse = () => {
        const newCourse = {
            title: this.state.newCourseTitle,
            owner: "me",
            lastModified: this.getCurrentDate()
        }
        courseService.createCourse(newCourse)
            .then(course => this.setState(
                (prevState) => ({
                    ...prevState,
                    courses: [
                        ...prevState.courses,
                        course,
                    ],
                    newCourseTitle: ""
                })))
    }

    setNewTitle(value) {
        this.setState((prev) => ({...prev, newCourseTitle: value}))
    }

    deleteCourse = (courseToDelete) => {
        courseService.deleteCourse(courseToDelete._id)
            .then(() =>
                      this.setState((prevState) => ({
                          ...prevState,
                          courses: prevState.courses.filter
                          (course => course !== courseToDelete)
                      })))
    }

    render() {
        return (
            <Container>
                <Link to="/">
                    <FaHome size={30}/>
                </Link>
                <div className={"addCourseInput"}>
                    <Input placeholder={"Add a course"} onChange={(e) =>
                        this.setNewTitle(e.target.value)} value={this.state.newCourseTitle}/>
                    <Tooltip title="Add Course">
                        <IconButton color="primary" onClick={this.addCourse}>
                            <FaPlus size={30}/>
                        </IconButton>
                    </Tooltip>
                </div>
                <h1>Course Manager</h1>
                <Route path="/courses/table" exact>
                    <h2>Course Table</h2>
                    <Tooltip title="Grid view">
                        <IconButton color={"primary"} component={Link}
                                    to="/courses/grid"
                                    aria-label="grid view">
                            <FaTh size={30}/>
                        </IconButton>
                    </Tooltip>
                    <CourseTable getFields={this.getFields} rows={this.state.courses}
                                 deleteRow={this.deleteCourse}
                                 updateRow={this.updateCourse}
                                 useStyles={tableStyles}/>
                </Route>
                <Route path="/courses/grid" exact>
                    <h2>Course Grid</h2>
                    <Tooltip title="Table View">
                        <IconButton aria-label="grid table" color={"primary"}
                                    component={Link}
                                    to="/courses/table" align={'right'}>
                            <FaTable size={30}/>
                        </IconButton>
                    </Tooltip>
                    <CourseGrid
                        deleteCard={this.deleteCourse} updateCard={this.updateCourse}
                        getFields={this.getFields} cards={this.state.courses}/>
                </Route>
                <Route path={[
                    "/courses/:layout/edit/:courseId",
                    "/courses/:layout/edit/:courseId/modules",
                    "/courses/:layout/edit/:courseId/modules/:moduleId",
                    "/courses/:layout/edit/:courseId/modules/:moduleId/lessons",
                    "/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId",
                    "/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId/topics",
                    "/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId",
                ]} exact
                       render={(props) => <CourseEditor {...props} layout={this.layout}/>}>
                </Route>
                <Redirect from={"/courses/editor/"} to={"/courses/table"}/>
            </Container>
        )
    }
}

export default withRouter(CourseManager)
