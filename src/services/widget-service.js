const BASE_URL = process.env.REACT_APP_SERVER_URL;


export const createWidgetForTopic = (topicId, widget) =>
    fetch(`${BASE_URL}/topics/${topicId}/widgets`, {
        method: "POST",
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json());

export const findWidgetsForTopic = (topicId) =>
    fetch(`${BASE_URL}/topics/${topicId}/widgets`)
        .then(response => response.json());


export const updateWidget = (id, widget) =>
    fetch(`${BASE_URL}/widgets/${id}`, {
        method: "PUT",
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json());

export const deleteWidget = (widgetId) =>
    fetch(`${BASE_URL}/widgets/${widgetId}`, {
        method: "DELETE"
    })
        .then(response => response.json());

export const findWidget = (widgetId) =>
    fetch(`${BASE_URL}/widgets/${widgetId}`, {
        method: "GET"
    })
        .then(response => response.json());

export default {
    findWidgetsForTopic, createWidgetForTopic, updateWidget,deleteWidget, findWidget
}
