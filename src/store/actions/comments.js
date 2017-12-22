import * as types from '../action-types';
import {comments,addComment} from '../../api/index';


export default {
    axiosComments(){
        return function (dispatch,getState) {
            let {
                    pageIndex,
                    perPage,
                    hasMore,
                    loading
            }=getState().comments;
            if(hasMore&&!loading){
                dispatch({type:types.AXIOS_COMMENTS});
                dispatch({
                    type:types.AXIOS_COMMENTS_SUCCESS,
                    payload:comments(pageIndex,perPage)
                });
            }
        }
    },

    refreshComments(){
        return function (dispatch,getState) {
            let {
                loading,
                pageIndex,perPage
            }=getState().comments;
            if(!loading){
                dispatch({type:types.REFRESH_COMMENTS});
                dispatch({
                    type:types.REFRESH_COMMENTS_SUCCESS,
                    payload:comments(pageIndex,perPage)
                });
            }

        }
    },
    addcomments(userId){
        return function (dispatch,getState) {
            addcomments(userId).then(result=>{
                dispatch({
                    type:types.ADDCOMMENTS,
                    payload:result
                });
                dispatch(push('/comments'))
            })

        }
    }

}