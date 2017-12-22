import * as types from '../action-types'
import {addAddress,addresses,deladdress,getOrder,getAddress,getProduct,reviseAddress} from '../../api/index'
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
    deleteaddress(id,userId){
        return function (dispatch,getState) {
            deladdress(id).then(result=>{
                result=result.filter(item=>item.userId==parseInt(userId)?item:null)
                dispatch({
                    type:types.DELADDRESS,
                    payload:result
                })
            })
        }
    },
    getOrder(userId){
        return function (dispatch,getState) {
            getOrder(userId).then(result=>{
                dispatch({
                    type:types.GETORDER,
                    payload:result
                })
            })
        }
    },
    getAddress(userId){
        return function (dispatch,getState) {
            getAddress(userId).then(result=>{
                dispatch({
                    type:types.GETADDRESS,
                    payload:result
                })
            })
        }
    },
    getProduct(id){
        return function (dispatch,getState) {
            getProduct(id).then(result=>{
                dispatch({
                    type:types.GETPRODUCT,
                    payload:result
                })
            })
        }
    },
    reviseAddress(user){
        return function (dispatch,getState) {
            reviseAddress(user).then(result=>{
                console.log(result);
                let users=result.filter((item)=>item.userId==user.userId?item:'')
                console.log(users);
                dispatch({
                    type:types.REVISEADDRESS,
                    payload:result
                })
                dispatch(push('/address'))
            })
        }
    }
}

