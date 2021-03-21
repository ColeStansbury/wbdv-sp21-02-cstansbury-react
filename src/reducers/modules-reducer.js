const initialState = {
    modules: [

    ]
}

const moduleReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FIND_RELATED_COURSE":
            return {...state, course: action.course}
        case "FIND_MODULES_FOR_COURSE":
            return {
                ...state,
                modules: action.modules
            }
        case "CREATE_MODULE":
            return {
                ...state,
                modules: [
                    ...state.modules,
                    action.module
                ]
            }
        case "DELETE_MODULE":
            return {
                modules: state.modules.filter(module => {
                    if (module._id === action.moduleToDelete._id) {
                        return false
                    } else {
                        return true
                    }
                })
            }
        case "UPDATE_MODULE":
            return {
                modules: state.modules.map(m => {
                    if (m._id === action.module._id) {
                        return action.module
                    } else {
                        return m
                    }
                })
            }
        default:
            return state
    }
}
export default moduleReducer
