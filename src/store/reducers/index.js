import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import comments from './comments'
import session from './session'
import cart from './cart'
import  address from './address'
let reducers=combineReducers({
    session,
    comments,
    address,
        cart,
    router:routerReducer
})
export default reducers