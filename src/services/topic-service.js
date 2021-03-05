const BASE_URL = "https://wbdv-generic-server.herokuapp.com/api/cstansbury";

export const createTopicForLesson = (lessonId, topic) =>
    fetch(`${BASE_URL}/lessons/${lessonId}/topics`, {
        method: "POST",
        body: JSON.stringify(topic),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json());

export const findTopicsForLesson = (lessonId) =>
    fetch(`${BASE_URL}/lessons/${lessonId}/topics`)
        .then(response => response.json());


export const updateTopicForLesson = (topic) =>
    fetch(`${BASE_URL}/topics/${topic._id}`, {
        method: "PUT",
        body: JSON.stringify(topic),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json());

export const deleteTopicFromLesson = (topicId) =>
    fetch(`${BASE_URL}/topics/${topicId}`, {
        method: "DELETE"
    })
        .then(response => response.json());



export default {
    findTopicsForLesson, createTopicForLesson, updateTopicForLesson,deleteTopicFromLesson,
}