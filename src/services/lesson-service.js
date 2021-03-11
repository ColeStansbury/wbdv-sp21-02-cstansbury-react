const BASE_URL = "https://wbdv-generic-server.herokuapp.com/api/cstansbury";

export const createLessonForModule = (moduleId, lesson) =>
    fetch(`${BASE_URL}/modules/${moduleId}/lessons`, {
        method: "POST",
        body: JSON.stringify(lesson),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json());

export const findLessonsForModule = (moduleId) =>
    fetch(`${BASE_URL}/modules/${moduleId}/lessons`)
        .then(response => response.json());

export const updateLesson = (lesson) =>
    fetch(`${BASE_URL}/lessons/${lesson._id}`, {
        method: "PUT",
        body: JSON.stringify(lesson),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json());

export const deleteLesson = (lessonId) =>
    fetch(`${BASE_URL}/lessons/${lessonId}`, {
        method: "DELETE"
    })
        .then(response => response.json());

export const findLesson = (lessonId) =>
    fetch(`${BASE_URL}/lessons/${lessonId}`, {
        method: "GET"
    })
        .then(response => response.json());

export default {
    findLessonsForModule, createLessonForModule, updateLesson, deleteLesson, findLesson
}