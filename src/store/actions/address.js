import * as types from '../action-types'
import {addAddress,addresses,deladdress} from '../../api/index'
import {push} from 'react-router-redux';

export default {
    addAddress(user){
        return function (dispatch,getState) {
            addAddress(user).then(result=>{
                dispatch({
                    type:types.ADD_ADDRESS,
                    payload:result
                });
                dispatch(push('/address'))
            })
        }
    },
    addresses(userId){
        return function (dispatch,getState) {
            addresses(userId).then(result=>{
                dispatch({
                    type:types.ADDRESSES,
                    payload:result
                })
            })
        }
    },
    deleteaddress(id){
        return function (dispatch,getState) {
            deladdress(id).then(result=>{
                console.log(result);
                dispatch({
                    type:types.DELADDRESS,
                    payload:result
                })
            })
        }
    }
}

