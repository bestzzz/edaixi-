import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import comments from './comments'
import session from './session'
let reducers=combineReducers({
    session,
    comments,
    router:routerReducer
})
export default reducers