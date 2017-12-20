import * as types from '../action-types'
import {addAddress} from '../../api/index'
import {push} from 'react-router-redux';

export default {
    addAddress(user){
        return function (dispatch,getState) {
            addAddress(user).then(result=>{
                dispatch({
                    type:types.ADD_ADDRESS,
                    payload:result
                })
                dispatch(push('/address'))
            })

        }
    }
}

