import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import EditableItem from "./editable-item";
import {useParams} from "react-router-dom";
import moduleService from "../../services/module-service"
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
    {modules = [], createModule, deleteModule, updateModule, findModulesForCourse}) => {
    const {courseId, moduleId} = useParams();
    const classes = useStyles();
    useEffect(() => {
        findModulesForCourse(courseId)
    }, [courseId, findModulesForCourse])
    const [itemSelected, setSelected] = useState(modules.map(()=>false));
    const changeSelectedItem = (i) => setSelected(modules.map((m, j) => j === i));
    return (
        <div className={classes.root}>
            <div className={classes.toolbar}/>
            <div>
                <h2>
                    Modules
                    <IconButton className={classes.newModuleBtn}
                                onClick={() => createModule(courseId)}>
                        <FaPlus/>
                    </IconButton>
                </h2>
            </div>
            <Divider/>
            <List>
                {modules.map((module, i) => (
                    <ListItem selected={itemSelected[i]} onClick={()=>changeSelectedItem(i)} button key={module._id}>
                        <EditableItem
                            to={`/courses/editor/${courseId}/${module._id}`}
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
        modules: state.moduleReducer.modules
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
        findModulesForCourse: (courseId) => {
            // alert(courseId);
            moduleService.findModulesForCourse(courseId)
                .then(theModules => dispatch({
                                                 type: "FIND_MODULES_FOR_COURSE",
                                                 modules: theModules
                                             }))
        }
    }
}

export default connect(stpm, dtpm)(ModuleList)
