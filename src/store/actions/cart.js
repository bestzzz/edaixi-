import * as types from '../action-types';
export default  {
    addCart(cart){
        return {
            type:types.ADD_CART,
            payload:cart
        }
    }
}