import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { LOAD_EMPLOYEE_INFO_SUCCESS, FILTERED_EMPLOYEE_SUCCESS } from './action'

let initialState={
    employeeList: [],
    filteredList: []
};
export const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EMPLOYEE_INFO_SUCCESS:
            return {
                ...state,
                employeeList: action.payload,
                filteredList: action.payload
            };
        case FILTERED_EMPLOYEE_SUCCESS:
            return {
                ...state,
                filteredList: action.payload
            };
        default:
            return state
    }
}

const enhancers = []
const devToolsExtension = window['__REDUX_DEVTOOLS_EXTENSION__']
if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
}
const composedEnhancers = compose(
    applyMiddleware(thunk),
    ...enhancers,
)
const store = createStore(employeeReducer,composedEnhancers);
export default store
