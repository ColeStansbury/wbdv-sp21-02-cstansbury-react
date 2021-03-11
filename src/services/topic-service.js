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


export const updateTopic = (topic) =>
    fetch(`${BASE_URL}/topics/${topic._id}`, {
        method: "PUT",
        body: JSON.stringify(topic),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json());

export const deleteTopic = (topicId) =>
    fetch(`${BASE_URL}/topics/${topicId}`, {
        method: "DELETE"
    })
        .then(response => response.json());

export const findTopic = (topicId) =>
    fetch(`${BASE_URL}/topics/${topicId}`, {
        method: "GET"
    })
        .then(response => response.json());

export default {
    findTopicsForLesson, createTopicForLesson, updateTopic,deleteTopic, findTopic
}