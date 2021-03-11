const BASE_URL = "https://wbdv-generic-server.herokuapp.com/api/cstansbury";

export const createModuleForCourse = (courseId, module) =>
    fetch(`${BASE_URL}/courses/${courseId}/modules`, {
        method: "POST",
        body: JSON.stringify(module),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
export const findModulesForCourse = (courseId) =>
    fetch(`${BASE_URL}/courses/${courseId}/modules`)
        .then(response => response.json())

export const updateModule = (module) =>
    fetch(`${BASE_URL}/modules/${module._id}`, {
        method: "PUT",
        body: JSON.stringify(module),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const deleteModule = (moduleId) =>
    fetch(`${BASE_URL}/modules/${moduleId}`, {
        method: "DELETE"
    })
        .then(response => response.json())

export const findModule = (moduleId) =>
    fetch(`${BASE_URL}/modules/${moduleId}`, {
        method: "GET"
    })
        .then(response => response.json())

const api = {
    findModulesForCourse, createModuleForCourse,
    deleteModule, updateModule, findModule
};

export default api;