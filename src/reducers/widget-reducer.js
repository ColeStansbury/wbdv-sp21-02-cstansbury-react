const initialState = {
    widgets: []
}

const widgetReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_WIDGET":
            return {
                ...state,
                widgets: [
                    ...state.widgets,
                    action.payload
                ]
            }
        case "FIND_WIDGETS":
            return {
                ...state,
                widgets: action.payload
            }
        case "UPDATE_WIDGET":
            return {
                ...state,
                widgets: state.widgets.map(w => w.id === action.payload.id ? action.payload : w)
            };
        case "DELETE_WIDGET":
            return {
                ...state,
                widgets: state.widgets.filter(w => w.id !== action.payload)
            };
        default:
            return state
    }
}

export default widgetReducer
