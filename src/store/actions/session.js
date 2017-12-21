import * as types from '../action-types'
import {Reg,Login,Logout,validate} from '../../api/index'
import {push} from 'react-router-redux';
export default {
    reg(user){
        return function (dispatch,getState) {
            Reg(user).then(result=>{
                let {code,success,err}=result;
                dispatch({
                    type:types.REG,
                    payload:{success,err}
                });
                if(code===0){
                    dispatch(push('/login'))
                }
            })
        }
    },
    login(user){
       return function (dispatch,getState) {
           Login(user).then(result=>{
               let {code,success,err,user}=result;
               dispatch({
                   type:types.LOGIN,
                   payload:{success,err,user}
               });
               if(code===0){
                   dispatch(push('/profile'))
               }
           });
       }
    },
    logout(){
        return function (dispatch,getState) {
            Logout().then(result=>{
                let {code,success,err}=result;
                dispatch({
                    type:types.LOGOUT,
                    payload:{success,err}
                });
                dispatch(push('/login'));
            })
        }
    },
    validate(){
        return function (dispatch,getState) {
            validate().then(result=>{
                console.log(result,111);
                let {err,success,user}=result;
                dispatch({
                    type:types.VALIDATE,
                    payload:{err,success,user}
                })
            })
        }
    },
    clearMessages(){
        return {
            type:types.CLEAR_MESSAGES
        }
    }

}