import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import EditableItem from "./editable-item";
import {useParams} from "react-router-dom";
import moduleService from "../../services/module-service"
import courseService from "../../services/course-service"
import {FaPlus} from "react-icons/all";
import {
    Divider,
    IconButton,
    List,
    ListItem,
    makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    newModuleBtn: {
        float: "right",
    },
}));

const ModuleList = (
    {
        history,
        modules = [],
        createModule,
        findModulesForCourse,
        deleteModule,
        updateModule,
        course = {title: ""},
        findCourse,
    }) => {
    const {layout, courseId} = useParams();
    const classes = useStyles();
    useEffect(() => {
        findModulesForCourse(courseId)
        findCourse(courseId)
    }, [courseId, findModulesForCourse, findCourse])
    const [itemSelected, setSelected] = useState(modules.map(() => false));
    const changeSelectedItem = (i) => setSelected(modules.map((m, j) => j === i));
    return (
        <div className={classes.root}>
            <div className={classes.toolbar}/>
            <div>
                <h2>
                    Modules for {course.title}
                    <IconButton className={classes.newModuleBtn}
                                onClick={() => createModule(courseId)}>
                        <FaPlus/>
                    </IconButton>
                </h2>
            </div>
            <Divider/>
            <List>
                {modules.map((module, i) => (
                    <ListItem selected={itemSelected[i]}
                              onClick={() => {
                                  changeSelectedItem(i)
                                  history.replace(
                                      `/courses/${layout}/edit/${courseId}/modules/${module._id}/lessons/`)
                              }} button key={module._id}
                    >
                        <EditableItem
                            updateItem={updateModule}
                            deleteItem={deleteModule}
                            active={true}
                            item={module}/>
                    </ListItem>
                ))}
            </List>
        </div>)
}

const stpm = (state) => {
    return {
        modules: state.moduleReducer.modules,
        course: state.moduleReducer.course,
    }
}
const dtpm = (dispatch) => {
    return {
        createModule: (courseId) => {
            moduleService.createModuleForCourse(courseId, {title: "New Module"})
                .then(theActualModule => dispatch({
                                                      type: "CREATE_MODULE",
                                                      module: theActualModule
                                                  }))
        },
        deleteModule: (item) =>
            moduleService.deleteModule(item._id)
                .then(status => dispatch({
                                             type: "DELETE_MODULE",
                                             moduleToDelete: item
                                         })),
        updateModule: (module) =>
            moduleService.updateModule(module)
                .then(status => dispatch({
                                             type: "UPDATE_MODULE",
                                             module
                                         })),
        findModulesForCourse: (courseId) =>
            moduleService.findModulesForCourse(courseId)
                .then(theModules => dispatch({
                                                 type: "FIND_MODULES_FOR_COURSE",
                                                 modules: theModules
                                             })),
        findCourse: (courseId) =>
            courseService.findCourseById(courseId)
                .then(course => dispatch({
                                             type: 'FIND_RELATED_COURSE', course
                                         }))
    }
}

export default connect(stpm, dtpm)(ModuleList)
