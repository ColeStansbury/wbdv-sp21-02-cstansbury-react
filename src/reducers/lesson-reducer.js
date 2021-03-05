const initialState = {
    lessons: []
}

const lessonReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_LESSON":
            return {
                ...state,
                lessons: [
                    ...state.lessons,
                    action.lesson
                ]
            }
        case "FIND_LESSONS":
            return {
                ...state,
                lessons: action.lessons
            }
        case "UPDATE_LESSON":
            return {
                ...state,
                lessons: state.lessons.map(l => l._id === action.lesson._id ? action.lesson : l)
            };
        case "DELETE_LESSON":
            return {
                ...state,
                lessons: state.lessons.filter(l => l._id !== action.lessonId)
            };
        default:
            return state
    }
}

export default lessonReducer