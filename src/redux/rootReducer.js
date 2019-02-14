import { combineReducers } from 'redux'
import employee from './Employee/reducer'

export default combineReducers({
    employee:employee
})