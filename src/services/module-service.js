const COURSES_URL = "https://wbdv-generic-server.herokuapp.com/api/cstansbury/courses";
const MODULES_URL = "https://wbdv-generic-server.herokuapp.com/api/cstansbury/modules";

export const createModuleForCourse = (courseId, module) =>
    fetch(`${COURSES_URL}/${courseId}/modules`, {
        method: "POST",
        body: JSON.stringify(module),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const updateModule = (module) =>
    fetch(`${MODULES_URL}/${module._id}`, {
        method: "PUT",
        body: JSON.stringify(module),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const findModulesForCourse = (courseId) =>
    fetch(`${COURSES_URL}/${courseId}/modules`)
        .then(response => response.json())

export const deleteModule = (moduleId) =>
    fetch(`${MODULES_URL}/${moduleId}`, {
        method: "DELETE"
    })
        .then(response => response.json())

const api = {
    findModulesForCourse, createModuleForCourse,
    deleteModule, updateModule
};

export default api;