import * as types from '../action-types';
export default  {
    addCart(cart,orderPriceSum){
        return {
            type:types.ADD_CART,
            payload:{cart,orderPriceSum}
        }
    }
}