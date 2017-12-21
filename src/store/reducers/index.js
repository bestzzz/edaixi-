import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import comments from './comments'
import session from './session'
import  address from './address'
let reducers=combineReducers({
    session,
    comments,
    address,

    router:routerReducer
})
export default reducers