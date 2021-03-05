import { combineReducers } from 'redux'
import  autorizationReducer  from './autorization'

export const rootReducer = combineReducers({
    autorization: autorizationReducer
})